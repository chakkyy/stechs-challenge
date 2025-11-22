FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY frontend/package.json ./frontend/
COPY packages/api/package.json ./packages/api/

# Enable corepack and use pnpm version from package.json
RUN corepack enable && corepack prepare pnpm@9.6.0 --activate

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY frontend/ ./frontend/
COPY packages/api/ ./packages/api/
COPY tsconfig.json ./

WORKDIR /app/frontend

# Expose port
EXPOSE 3000

# Start in dev mode
CMD ["pnpm", "dev"]

