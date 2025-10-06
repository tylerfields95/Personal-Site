# =========================================
# Stage 1: Build the Angular Application
# =========================================

ARG NODE_VERSION=24.7.0-alpine
ARG PNPM_VERSION=10.15.0
ARG NGINX_VERSION=alpine3.22

# Use a lightweight Node.js image for building (customizable via ARG)
FROM node:${NODE_VERSION} AS builder

# Set the working directory inside the container
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

# Copy package-related files first to leverage Docker's caching mechanism
COPY package.json pnpm-lock.yaml ./

# Install project dependencies using pnpm (ensures a clean, reproducible install)
RUN --mount=type=cache,target=/root/.local/share/pnpm pnpm install --frozen-lockfile

# Copy the rest of the application source code into the container
COPY . .

# Build the Angular application
RUN pnpm run build 

# =========================================
# Stage 2: Prepare Nginx to Serve Static Files
# =========================================

FROM nginxinc/nginx-unprivileged:${NGINX_VERSION} AS runner

# Use a built-in non-root user for security best practices
USER nginx

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the static build output from the build stage to Nginx's default HTML serving directory
COPY --chown=nginx:nginx --from=builder /app/dist/*/browser /usr/share/nginx/html

# Expose port 8080 to allow HTTP traffic
EXPOSE 8080

# Start Nginx directly with custom config
ENTRYPOINT ["nginx", "-c", "/etc/nginx/nginx.conf"]
CMD ["-g", "daemon off;"]
