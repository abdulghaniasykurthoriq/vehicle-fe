# --- builder: build React ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Vite/CRA sama-sama pakai "npm run build"
RUN npm run build

# --- runtime: Nginx untuk file statik ---
FROM nginx:1.27-alpine
# Nginx SPA config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Vite -> "dist", CRA -> "build"
# kalau CRA, ganti "/app/dist" jadi "/app/build"
COPY --from=builder /app/dist /usr/share/nginx/html

ENV NGINX_ENTRYPOINT_QUIET_LOGS=1
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1/ || exit 1
