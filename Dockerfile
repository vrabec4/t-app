# Default stage builds a production-ready container

FROM node:20-alpine AS base

# Install system dependencies and pnpm
RUN apk add --no-cache libc6-compat curl
RUN corepack enable && corepack prepare pnpm@10.12.2 --activate

# Set working directory
WORKDIR /app

# Environment variables
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# ===========================
# Dependencies Stage
# ===========================
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install all dependencies (including dev dependencies for building)
RUN pnpm install --frozen-lockfile

# ===========================
# Code Generation Stage
# ===========================
FROM deps AS codegen
WORKDIR /app

# Copy configuration files needed for code generation
COPY orval.config.ts ./
COPY openapi.json ./
COPY tsconfig.json ./
COPY next.config.ts ./
COPY .prettierrc ./
COPY .prettierignore ./
COPY eslint.config.mjs ./

# Copy source files needed for generation
COPY src/openapi/api-client.ts ./src/openapi/api-client.ts

# Generate OpenAPI clients and types using Orval
RUN pnpm run generate:orval

# ===========================
# Linting and Formatting Stage
# ===========================
FROM codegen AS lint-and-format
WORKDIR /app

# Copy all source files
COPY src/ ./src/
COPY public/ ./public/
COPY components.json ./
COPY postcss.config.mjs ./
COPY tailwindcss.config.* ./
COPY vitest.config.ts ./
COPY playwright.config.ts ./

# Run linting
RUN pnpm run lint

# Run formatting
RUN pnpm run format

# ===========================
# Builder Stage
# ===========================
FROM lint-and-format AS builder
WORKDIR /app

# Build the Next.js application
RUN pnpm run build

# ===========================
# Development Stage
# ===========================
FROM base AS development
WORKDIR /app

# Copy package files and install dependencies
COPY package.json pnpm-lock.yaml ./
# Installation of all dependencies 
RUN pnpm install

# Copy all source files
COPY . .

# Expose development port
EXPOSE 3000

# Start development server
CMD ["pnpm", "dev"]

# ===========================
# Production Stage 1
# ===========================
FROM base AS production-basic
WORKDIR /app

# Copy only necessary files from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.ts ./next.config.ts

# Expose the production port
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]
# ===========================
# Production Stage 2
# ===========================
FROM base AS production-optimized
WORKDIR /app

# Copy package.json and install only production dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod

# Copy build output from builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.ts ./next.config.ts

# Expose the production port
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]
# ===========================
# Production Stage 3 (Secure)
# ===========================
FROM base AS production
WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Create nextjs user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public assets
COPY --from=builder /app/public ./public

# Create .next directory with correct permissions
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copy built application
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to nextjs user
USER nextjs

# Expose production port
EXPOSE 3000

# Set runtime environment variables
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

# Start production server
CMD ["node", "server.js"]

# Make production the default target
FROM production
