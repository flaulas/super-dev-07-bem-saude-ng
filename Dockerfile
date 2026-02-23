# syntax=docker/dockerfile:1

# ============================================
# Stage 1: Build Angular Application
# ============================================
FROM node:22-alpine AS builder

ARG APP_VERSION=dev
ARG BUILD_CONFIGURATION=production

WORKDIR /app

# Install dependencies first (cache layer)
COPY package.json package-lock.json* ./
RUN npm ci --ignore-scripts

# Copy source files
COPY . .

# Build for specified configuration
RUN npx ng build --configuration=${BUILD_CONFIGURATION}

# ============================================
# Stage 2: Production Runtime with Nginx
# ============================================
FROM nginx:1.27-alpine AS production

ARG APP_VERSION=dev
ARG BUILD_DATE

LABEL org.opencontainers.image.title="Bem Saúde Frontend" \
      org.opencontainers.image.description="Angular frontend for Bem Saúde" \
      org.opencontainers.image.version="${APP_VERSION}" \
      org.opencontainers.image.created="${BUILD_DATE}" \
      maintainer="Bem Saúde"

# Install curl for healthcheck
RUN apk add --no-cache curl

# Remove default nginx config
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built application
COPY --from=builder /app/dist/bem-saude-ng/browser /usr/share/nginx/html

# Set proper permissions for non-root
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

# Run as non-root user
USER nginx

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:80/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
