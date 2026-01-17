# ---- Build stage ----
FROM node:20-alpine AS builder
WORKDIR /app

# Enable pnpm via Corepack (recommended)
RUN corepack enable

# Copy only dependency manifests first (better caching)
COPY package.json pnpm-lock.yaml ./

# Install deps
RUN pnpm install --frozen-lockfile

# Copy the rest of the source
COPY . .

# Build Astro
RUN pnpm build

# ---- Runtime stage ----
FROM nginx:alpine

# Remove default config
RUN rm /etc/nginx/conf.d/default.conf

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built site
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
