FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY backend/package.json ./backend/
COPY packages/api/package.json ./packages/api/

# Enable corepack and use pnpm version from package.json
RUN corepack enable && corepack prepare pnpm@9.6.0 --activate

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY backend/ ./backend/
COPY packages/api/ ./packages/api/
COPY tsconfig.json ./

WORKDIR /app/backend

# Generate Prisma Client
RUN pnpm db:generate

# Expose port
EXPOSE 3001

# Start in dev mode with hot-reload
CMD ["pnpm", "dev"]

