#!/usr/bin/env bash
# deploy/deploy.sh
# Eseguire sulla VPS: bash /opt/human/deploy/deploy.sh
set -euo pipefail

DEPLOY_DIR="/opt/human"
REPO="https://github.com/Baltanik/human.git"
BRANCH="main"
CADDY_CONTAINER="one2one_caddy"
CADDYFILE_HOST="/opt/one2one/app/deploy/caddy/Caddyfile"

log() { echo "[$(date -u +%H:%M:%S)] $*"; }

# ── 1. Pull / clone ───────────────────────────────────────────────────────────
log "1/6 — Aggiorno il repository"
if [ -d "$DEPLOY_DIR/.git" ]; then
  git -C "$DEPLOY_DIR" pull origin "$BRANCH"
else
  git clone --depth=1 -b "$BRANCH" "$REPO" "$DEPLOY_DIR"
fi

# ── 2. Verifica .env ──────────────────────────────────────────────────────────
log "2/6 — Verifico .env"
if [ ! -f "$DEPLOY_DIR/.env" ]; then
  echo "ERROR: $DEPLOY_DIR/.env non trovato."
  echo "  Crea il file partendo da .env.example e imposta segreti reali."
  exit 1
fi

# Controlli minimi sui segreti
if grep -q "change_me" "$DEPLOY_DIR/.env" 2>/dev/null; then
  echo "ERROR: .env contiene ancora valori placeholder (change_me). Aggiornali prima del deploy."
  exit 1
fi

# ── 3. Build e avvio stack human ─────────────────────────────────────────────
log "3/6 — Build e avvio container human"
cd "$DEPLOY_DIR"
docker compose -f docker-compose.prod.yml up -d --build --remove-orphans

# ── 4. Collega Caddy alla rete human_external ─────────────────────────────────
log "4/6 — Collego Caddy a human_external"
if docker network inspect human_external | grep -q "\"$CADDY_CONTAINER\""; then
  log "  Caddy è già connesso a human_external — skip"
else
  docker network connect human_external "$CADDY_CONTAINER"
  log "  Connessione effettuata"
fi

# ── 5. Verifica blocco Caddyfile e ricarica ───────────────────────────────────
log "5/6 — Ricarico Caddy"
if ! grep -q "rewido.it" "$CADDYFILE_HOST"; then
  echo "WARN: blocco rewido.it non trovato in $CADDYFILE_HOST"
  echo "  Aggiungi manualmente il blocco dal PRD prima di ricaricare."
  echo "  Caddy NON ricaricato per sicurezza."
  exit 1
fi

docker exec "$CADDY_CONTAINER" caddy validate --config /etc/caddy/Caddyfile
docker exec "$CADDY_CONTAINER" caddy reload --config /etc/caddy/Caddyfile
log "  Caddy ricaricato con successo"

# ── 6. Health check ───────────────────────────────────────────────────────────
log "6/6 — Health check"
sleep 8
if curl -sf --max-time 10 https://rewido.it/ > /dev/null; then
  log "OK: https://rewido.it risponde correttamente"
else
  echo "WARN: health check fallito. Controlla:"
  echo "  docker logs human_frontend"
  echo "  docker logs human_backend"
  echo "  docker exec $CADDY_CONTAINER caddy validate --config /etc/caddy/Caddyfile"
fi

log "Deploy completato."
