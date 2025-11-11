# =========================================
# Stage 1: Build the Angular Application
# =========================================

ARG NODE_VERSION=24.7.0-alpine
ARG PNPM_VERSION=10.15.0
ARG NGINX_VERSION=alpine3.22

FROM node:${NODE_VERSION} AS builder

WORKDIR /app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

# Install deps with cache
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,target=/root/.local/share/pnpm pnpm install --frozen-lockfile

# Copy source and build
COPY . .
RUN pnpm run build

# =========================================
# Stage 2: Serve with Nginx (unprivileged)
# =========================================

FROM nginxinc/nginx-unprivileged:${NGINX_VERSION} AS runner

# Nginx config must listen on 8080 and handle SPA fallback
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built app; set ownership at copy time for UID 101 (nginx-unprivileged)
COPY --from=builder --chown=101:101 /app/dist/*/browser /usr/share/nginx/html

# Expose HTTP
EXPOSE 8080

# Run nginx in foreground (image default user is already non-root UID 101)
CMD ["nginx", "-g", "daemon off;"]
