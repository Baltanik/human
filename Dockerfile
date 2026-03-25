# ── Stage 1: build Svelte frontend ───────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
# Build args are injected at build time by docker-compose
ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# ── Stage 2: production image ─────────────────────────────────────────────────
FROM node:22-alpine AS production

WORKDIR /app
ENV NODE_ENV=production

# Install only production deps
COPY package*.json ./
RUN npm ci --omit=dev

# Copy backend source
COPY server/ ./server/

# Copy built frontend from stage 1 (served by Nginx, not this container)
# but we keep it here as reference / fallback
COPY --from=builder /app/dist ./dist

# Ensure data directory exists
RUN mkdir -p /app/data

EXPOSE 3001

CMD ["node", "server/index.js"]
