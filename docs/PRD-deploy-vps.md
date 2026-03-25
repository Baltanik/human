# PRD — Deploy di `human` sulla VPS one2one

**Versione:** 1.0  
**Data:** 2026-03-25  
**Autore:** AI Engineering  
**Stato:** In revisione

---

## 1. Contesto e vincoli non negoziabili

### 1.1 VPS — stato attuale

| Risorsa | Valore |
|---|---|
| OS | Ubuntu 24.04 LTS |
| CPU | 12 core |
| RAM | 62 GB (usata ~3 GB, ~59 GB liberi) |
| Disco | 436 GB (usati 67 GB, ~348 GB liberi) |
| Docker | 29.1 |
| Reverse proxy | **Caddy 2** (container `one2one_caddy`) |
| Porte esposte | 80, 443 (solo Caddy) |

### 1.2 Stack one2one — INTOCCABILE

```
one2one_caddy      → porta 80/443 (Caddy, entry point unico)
one2one_app        → porta 3000 (app Node.js/Next.js)
one2one_postgres   → porta 5432 (interno)
one2one_redis      → porta 6379 (interno)
```

Reti Docker one2one:
- `app_external` — Caddy ↔ App (`172.19.x.x`)
- `app_internal` — App ↔ Postgres ↔ Redis (`172.18.x.x`)

**Regola assoluta:** nessun container, volume, rete, variabile o file di one2one viene modificato. L'unica operazione su one2one è aggiungere un blocco nel Caddyfile (append, nessuna modifica alle righe esistenti) e collegare Caddy alla nuova rete `human_external`.

---

## 2. Progetto `human`

### 2.1 Cos'è

Sito di marketing + lead generation per **Human Marketing** (agenzia di performance marketing per la ristorazione italiana). URL finale: `rewido.it` (dominio transitorio) → futuro URL definitivo da decidere.

### 2.2 Stack applicativo

```
Frontend   → Svelte 5 + Vite, SPA statica servita da Nginx Alpine
Backend    → Express 5 + SQLite (better-sqlite3), Node 22 Alpine
Auth admin → JWT (bcrypt password hash, nessun OAuth)
```

Funzionalità:
- Sito vetrina (Home, About, Services, Blog)
- Form prenotazione call multi-step → salva contatto su SQLite
- Pagina admin protetta: gestione contatti, impostazioni tracking (GTM, GA4, Meta Pixel, Calendly)

### 2.3 Dominio

- **Ora:** `rewido.it` (DNS deve puntare all'IP della VPS)
- **Futuro:** cambio dominio → aggiornare solo il blocco Caddyfile + `CORS_ORIGIN`

---

## 3. Architettura target

```
Internet
   │
   ▼
[Caddy :443] (container one2one_caddy, già in produzione)
   │
   ├── one2one.it / www.one2one.it / staging.one2one.it / menu.one2one.it
   │      └── → one2one_app:3000  (rete app_external) ← INVARIATO
   │
   └── rewido.it / www.rewido.it          ← NUOVO blocco append-only
          └── → human_frontend:80  (rete human_external)
                    │
                    ├── /* → Nginx (Svelte SPA statica)
                    └── /api/* → human_backend:3001 (proxy interno Nginx)
```

### 3.1 Reti Docker

| Rete | Scope | Chi ci sta |
|---|---|---|
| `app_external` | esistente | one2one_caddy, one2one_app |
| `app_internal` | esistente | one2one_app, postgres, redis |
| `human_external` | **nuova** | one2one_caddy, human_frontend |
| `human_internal` | **nuova** | human_frontend, human_backend |

Caddy viene aggiunto a `human_external` senza rimuoverlo dalle reti esistenti. I container human non vedono mai `app_external` o `app_internal`.

### 3.2 Volumi Docker

| Volume | Contenuto |
|---|---|
| `human_db_data` | SQLite database (`human.db`) |

---

## 4. File da creare / modificare

### 4.1 Nel repo `human` (locale → push GitHub)

| File | Operazione | Descrizione |
|---|---|---|
| `docker-compose.prod.yml` | **Creare** | Stack produzione con reti isolate |
| `nginx/nginx.conf` | Già presente | Nginx serve SPA + proxy `/api` → backend |
| `.env.example` | Già presente, aggiornare | Aggiungere note produzione |
| `docs/PRD-deploy-vps.md` | **Questo file** | Documentazione |

### 4.2 Sulla VPS (mai nel repo — contengono segreti)

| File | Path VPS | Descrizione |
|---|---|---|
| `.env` | `/opt/human/.env` | Variabili produzione (JWT_SECRET, hash password, CORS) |

### 4.3 Sul deploy one2one (Caddyfile — append only)

| File | Operazione |
|---|---|
| `/opt/one2one/app/deploy/caddy/Caddyfile` | Aggiungere blocco `rewido.it` in fondo |

---

## 5. Variabili d'ambiente produzione

```dotenv
# /opt/human/.env  — NON committare mai questo file

PORT=3001
NODE_ENV=production

# Generare con: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET=<64-char-hex>

ADMIN_EMAIL=admin@humanmarketing.it
# Generare con: npm run hash-password <nuova-password-sicura>
ADMIN_PASSWORD_HASH=<bcrypt-hash>

# Dominio produzione (no trailing slash)
CORS_ORIGIN=https://rewido.it

# Percorso DB nel container
DB_PATH=/app/data/human.db

# Lasciare vuoto: frontend chiama /api/* same-origin, Nginx fa proxy
VITE_API_URL=
```

**Azioni obbligatorie prima del deploy:**
1. Generare un nuovo `JWT_SECRET` (non riutilizzare quello di dev)
2. Impostare una password admin sicura e fare hash con `npm run hash-password`
3. Non usare mai `admin123` in produzione

---

## 6. Caddyfile — blocco da aggiungere

Questo blocco viene aggiunto **in fondo** al file esistente. Le righe precedenti non vengono toccate.

```caddy
# ============================================
# HUMAN MARKETING - rewido.it
# ============================================
rewido.it, www.rewido.it {
    @apex host rewido.it
    redir @apex https://www.rewido.it{uri} permanent

    reverse_proxy human_frontend:80 {
        health_uri /
        health_interval 30s
        header_up X-Forwarded-Proto https
    }

    encode gzip zstd

    header {
        Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
        X-Content-Type-Options "nosniff"
        Referrer-Policy "strict-origin-when-cross-origin"
        X-XSS-Protection "0"
        Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=()"
        -X-Frame-Options
    }

    log {
        output stdout
        format json
    }
}
```

---

## 7. `docker-compose.prod.yml`

```yaml
version: "3.9"

networks:
  # Rete condivisa con Caddy (solo frontend è raggiungibile dall'esterno)
  human_external:
    name: human_external
    driver: bridge
  # Rete interna: frontend → backend (mai esposta a Caddy o a one2one)
  human_internal:
    name: human_internal
    driver: bridge
    internal: true

volumes:
  human_db_data:
    name: human_db_data

services:
  human_backend:
    build:
      context: .
      target: production
    container_name: human_backend
    restart: unless-stopped
    env_file: .env
    environment:
      NODE_ENV: production
      DB_PATH: /app/data/human.db
    volumes:
      - human_db_data:/app/data
    networks:
      - human_internal
    expose:
      - "3001"
    healthcheck:
      test: ["CMD", "wget", "-qO-", "http://localhost:3001/api/health"]
      interval: 30s
      timeout: 5s
      retries: 3

  human_frontend:
    image: nginx:1.27-alpine
    container_name: human_frontend
    restart: unless-stopped
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/conf.d/default.conf:ro
      - human_dist:/usr/share/nginx/html:ro
    networks:
      - human_external   # raggiungibile da Caddy
      - human_internal   # può chiamare human_backend
    expose:
      - "80"
    depends_on:
      human_backend:
        condition: service_healthy

  # One-shot: compila il frontend e popola il volume dist
  human_dist_init:
    build:
      context: .
      target: builder
      args:
        VITE_API_URL: ""
    container_name: human_dist_init
    command: sh -c "cp -r /app/dist/. /dist/"
    volumes:
      - human_dist:/dist
    networks:
      - human_internal
    restart: "no"

volumes:
  human_db_data:
  human_dist:
```

---

## 8. Script deploy VPS

```bash
#!/usr/bin/env bash
# deploy/deploy.sh — eseguire sulla VPS come utente con accesso Docker
set -euo pipefail

DEPLOY_DIR="/opt/human"
REPO="https://github.com/Baltanik/human.git"
BRANCH="main"

echo "[1/6] Pull repo"
if [ -d "$DEPLOY_DIR/.git" ]; then
  git -C "$DEPLOY_DIR" pull origin "$BRANCH"
else
  git clone --depth=1 -b "$BRANCH" "$REPO" "$DEPLOY_DIR"
fi

echo "[2/6] Verifica .env"
if [ ! -f "$DEPLOY_DIR/.env" ]; then
  echo "ERROR: /opt/human/.env non trovato. Crealo prima di proseguire."
  exit 1
fi

echo "[3/6] Build e start stack human"
cd "$DEPLOY_DIR"
docker compose -f docker-compose.prod.yml up -d --build --remove-orphans

echo "[4/6] Collega Caddy alla rete human_external"
docker network connect human_external one2one_caddy 2>/dev/null || echo "  Caddy già connesso a human_external"

echo "[5/6] Ricarica Caddy (zero-downtime)"
docker exec one2one_caddy caddy reload --config /etc/caddy/Caddyfile

echo "[6/6] Health check"
sleep 5
curl -sf https://rewido.it/ > /dev/null && echo "OK: rewido.it risponde" || echo "WARN: health check fallito, controlla i log"

echo "Deploy completato."
```

---

## 9. Checklist pre-deploy

### DNS
- [ ] Record `A` per `rewido.it` → IP della VPS
- [ ] Record `A` per `www.rewido.it` → IP della VPS
- [ ] Propagazione verificata con `dig rewido.it`

### VPS
- [ ] `/opt/human/.env` creato con segreti reali (non dev)
- [ ] `JWT_SECRET` generato fresh (64 byte hex)
- [ ] `ADMIN_PASSWORD_HASH` generato con password sicura
- [ ] `CORS_ORIGIN=https://rewido.it`

### Caddyfile
- [ ] Blocco `rewido.it` aggiunto **in fondo** al file `/opt/one2one/app/deploy/caddy/Caddyfile`
- [ ] Nessuna riga precedente modificata
- [ ] `caddy validate` eseguito prima del reload

### Docker
- [ ] Rete `human_external` creata
- [ ] `one2one_caddy` connesso a `human_external` (senza rimuovere connessioni esistenti)
- [ ] Container one2one invariati: `docker ps` mostra tutti e 4 ancora `Up`

### Post-deploy
- [ ] `https://rewido.it` carica il sito
- [ ] Form prenotazione salva correttamente (test con email reale)
- [ ] Admin panel accessibile su `https://rewido.it/#/admin`
- [ ] `docker logs human_backend` — nessun errore

---

## 10. Rollback

Se qualcosa va storto con Caddy:

```bash
# Rimuovi la connessione human_external da Caddy
docker network disconnect human_external one2one_caddy

# Ricarica Caddy senza il blocco rewido.it
docker exec one2one_caddy caddy reload --config /etc/caddy/Caddyfile
```

One2one non è mai stato toccato: torna operativo istantaneamente.

Per fermare human:
```bash
cd /opt/human && docker compose -f docker-compose.prod.yml down
```

---

## 11. Cambio dominio futuro

Quando `rewido.it` diventa il dominio definitivo (o viene sostituito):

1. Nel Caddyfile: sostituire `rewido.it, www.rewido.it` con il nuovo dominio
2. Nel `/opt/human/.env` sulla VPS: aggiornare `CORS_ORIGIN`
3. `docker exec one2one_caddy caddy reload --config /etc/caddy/Caddyfile`
4. DNS: puntare il nuovo dominio alla stessa VPS

Nessun rebuild richiesto (il frontend usa `/api` relativo, indipendente dal dominio).
