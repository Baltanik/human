# Deploy — human su VPS one2one

**Ultima esecuzione:** 2026-03-25  
**Stato:** Production live su `https://www.rewido.it`

---

## REGOLA ASSOLUTA — ONE2ONE È INTOCCABILE

> **Non modificare, riavviare, fermare, ispezionare o toccare in qualsiasi modo i seguenti container:**
> - `one2one_app`
> - `one2one_caddy`
> - `one2one_postgres`
> - `one2one_redis`
>
> **Non modificare le reti Docker:** `app_external`, `app_internal`  
> **Non modificare i volumi Docker di one2one**  
> **L'unica operazione consentita su one2one_caddy** è `docker network connect` e `docker exec caddy reload` — mai `docker stop`, `docker rm`, `docker restart`.

Violare questa regola mette offline one2one.it in produzione.

---

## Architettura

```
Internet
   │
   ▼
[one2one_caddy :443]  ← INTOCCABILE
   │
   ├── one2one.it / www.one2one.it  →  one2one_app:3000   (invariato)
   │
   └── rewido.it / www.rewido.it    →  human_frontend:80  (rete human_external)
                                              │
                                              ├── /*      → Nginx (Svelte SPA)
                                              └── /api/*  → human_backend:3001
```

### Reti Docker

| Rete | Proprietario | Modificabile |
|------|-------------|-------------|
| `app_external` | one2one | **MAI** |
| `app_internal` | one2one | **MAI** |
| `human_external` | human | Sì |
| `human_internal` | human | Sì |

### Container human

| Container | Immagine | Porta interna | Visibile dall'esterno |
|-----------|----------|--------------|----------------------|
| `human_backend` | build locale (Node 22 Alpine) | 3001 | No |
| `human_frontend` | nginx:1.27-alpine | 80 | Solo da Caddy via `human_external` |
| `human_dist_init` | build locale (one-shot) | — | No |

---

## Primo deploy (da zero)

### Prerequisiti

- Accesso SSH alla VPS: `ssh one2one` (alias in `~/.ssh/config`)
- DNS `rewido.it` e `www.rewido.it` puntano a `65.109.104.223`
- Il blocco Caddy non è ancora nel Caddyfile

### Step 1 — Prepara il `.env` sulla VPS

Il file **non deve mai essere committato**. Copialo con `scp` dalla macchina locale:

```bash
# Crea il file localmente (sostituisci i valori)
cat > /tmp/human_env_prod << 'EOF'
PORT=3001
NODE_ENV=production
JWT_SECRET=<genera con: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))">
ADMIN_EMAIL=admin@humanmarketing.it
ADMIN_PASSWORD_HASH=<genera con: npm run hash-password <tua-password>>
CORS_ORIGIN=https://rewido.it
DB_PATH=/app/data/human.db
VITE_API_URL=
EOF

# Caricalo sulla VPS
scp /tmp/human_env_prod one2one:/opt/human/.env
```

> **Importante:** il file `.env` viene montato come volume in sola lettura nel container (`/app/.env`) e letto direttamente da `dotenv`. Non usare `env_file:` in docker compose per questo file — l'interpolazione di `$` di compose corrompe gli hash bcrypt.

### Step 2 — Aggiungi il blocco Caddy

```bash
# Sulla VPS — append only, mai modificare le righe precedenti
cat /opt/human/deploy/caddy-rewido-block.conf >> /opt/one2one/app/deploy/caddy/Caddyfile

# Verifica visiva
tail -35 /opt/one2one/app/deploy/caddy/Caddyfile
```

### Step 3 — Esegui il deploy

```bash
bash /opt/human/deploy/deploy.sh
```

Lo script fa:
1. `git pull` del repo
2. Verifica che `/opt/human/.env` esista
3. `docker compose up -d --build`
4. `docker network connect human_external one2one_caddy`
5. `caddy validate` + `caddy reload` (zero-downtime)
6. Health check su `https://rewido.it`

---

## Deploy aggiornamento (codice cambiato)

```bash
ssh one2one
cd /opt/human
git pull origin main
docker compose -f docker-compose.prod.yml up -d --build human_backend human_dist_init human_frontend
```

Se solo il backend è cambiato:

```bash
docker compose -f docker-compose.prod.yml up -d --build human_backend
```

> **Non eseguire `docker compose down`** durante un aggiornamento — `human_frontend` resterebbe offline. Usa sempre `up --build` per ricreazione in-place.

---

## Cambio dominio

Quando `rewido.it` viene sostituito da un dominio definitivo:

1. Aggiungi i record DNS `A` del nuovo dominio → `65.109.104.223`
2. Sulla VPS, modifica il Caddyfile (solo il blocco human, mai quello one2one):
   ```bash
   nano /opt/one2one/app/deploy/caddy/Caddyfile
   # Sostituisci rewido.it, www.rewido.it con il nuovo dominio
   ```
3. Aggiorna `CORS_ORIGIN` nel `.env` e ricarica:
   ```bash
   scp /tmp/nuovo_env one2one:/opt/human/.env
   docker compose -f /opt/human/docker-compose.prod.yml up -d human_backend
   docker exec one2one_caddy caddy validate --config /etc/caddy/Caddyfile
   docker exec one2one_caddy caddy reload --config /etc/caddy/Caddyfile
   ```
4. Nessun rebuild del frontend richiesto (usa `/api` relativo)

---

## Rollback

Se qualcosa va storto con Caddy dopo un aggiornamento del Caddyfile:

```bash
# Disconnetti Caddy da human_external — one2one torna operativo istantaneamente
docker network disconnect human_external one2one_caddy

# Rimuovi il blocco rewido dal Caddyfile e ricarica
docker exec one2one_caddy caddy reload --config /etc/caddy/Caddyfile
```

Per fermare solo lo stack human (one2one non viene toccato):

```bash
cd /opt/human
docker compose -f docker-compose.prod.yml down
```

---

## Variabili d'ambiente

| Variabile | Descrizione | Esempio |
|-----------|-------------|---------|
| `PORT` | Porta backend | `3001` |
| `NODE_ENV` | Ambiente | `production` |
| `JWT_SECRET` | Chiave JWT (64 byte hex) | genera con crypto |
| `ADMIN_EMAIL` | Email admin panel | `admin@humanmarketing.it` |
| `ADMIN_PASSWORD_HASH` | Hash bcrypt password admin | genera con `npm run hash-password` |
| `CORS_ORIGIN` | Origine CORS consentita | `https://rewido.it` |
| `DB_PATH` | Path SQLite nel container | `/app/data/human.db` |
| `VITE_API_URL` | URL API per il frontend | vuoto (usa `/api` relativo) |

**Generare nuovi segreti:**

```bash
# JWT_SECRET
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# ADMIN_PASSWORD_HASH
npm run hash-password "NuovaPasswordSicura"
```

---

## Comandi diagnostica

```bash
# Stato container
docker ps --format 'table {{.Names}}\t{{.Status}}'

# Log backend
docker logs human_backend --tail=50 -f

# Log frontend (Nginx)
docker logs human_frontend --tail=20

# Log Caddy (solo human, filtra one2one)
docker logs one2one_caddy --since=10m 2>&1 | grep rewido

# Health check API
curl -s https://www.rewido.it/api/health

# Verifica .env montato nel container
docker exec human_backend cat /app/.env
```

---

## Path VPS

| Risorsa | Path |
|---------|------|
| Repo human | `/opt/human/` |
| `.env` produzione | `/opt/human/.env` |
| Caddyfile one2one | `/opt/one2one/app/deploy/caddy/Caddyfile` |
| Volume DB SQLite | Docker volume `human_db_data` |
| Volume dist frontend | Docker volume `human_dist` |
