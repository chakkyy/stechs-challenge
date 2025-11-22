# Stechs Challenge - Aplicación Full Stack

## 🚀 Inicio Rápido

### Opción 1: Todo en Docker (Recomendado para consistencia)

```bash
# Iniciar todos los servicios (base de datos + backend + frontend)
docker compose up -d

# Ver logs
docker compose logs -f

# Detener todo
docker compose down
```

**Acceso:**

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Base de datos: localhost:5433

### Opción 2: Híbrido (Base de datos en Docker, servicios locales - Iteración más rápida)

```bash
# Iniciar solo la base de datos
pnpm db:dev

# Iniciar backend + frontend localmente
pnpm dev
```

**¿Por qué Opción 2?**

- ✅ Hot-reload más rápido (sin overhead de Docker)
- ✅ Debugging más fácil (acceso directo a procesos)
- ✅ Mejor integración con IDE
- ✅ Tiempo de inicio más rápido

**¿Por qué Opción 1?**

- ✅ Entorno consistente (igual a producción)
- ✅ No necesita Node.js/pnpm local
- ✅ Dependencias aisladas
- ✅ Onboarding fácil para nuevos desarrolladores

## 📁 Estructura del Proyecto

```
stechs-challenge/
├── backend/          # API Fastify + tRPC + Prisma
├── frontend/         # Next.js + React + Cliente tRPC
├── packages/
│   └── api/          # Tipos compartidos AppRouter
└── docker-compose.yml
```

## 🛠️ Stack Tecnológico

### Frontend

- **Next.js 14** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Cliente tRPC** - Llamadas a API con tipado
- **React Query** - Gestión de estado del servidor
- **shadcn/ui** - Componentes de UI
- **Tailwind CSS** - Estilos

### Backend

- **Fastify** - Framework web rápido
- **tRPC** - Tipado end-to-end
- **Prisma** - ORM con tipado
- **PostgreSQL** - Base de datos
- **Zod** - Validación en runtime

### Compartido

- **pnpm** - Gestor de paquetes
- **Docker** - Contenedores
- **TypeScript** - Tipos compartidos en monorepo

## 🛠️ Desarrollo

### Prerequisitos

- Docker & Docker Compose
- Node.js 20+
- pnpm 8+

### Primera Configuración

```bash
# Instalar dependencias
pnpm install

# Iniciar solo la base de datos
pnpm db:dev

# Ejecutar migraciones y seed (desde directorio backend)
cd backend
pnpm db:migrate:deploy
pnpm db:seed

# Iniciar servidores de desarrollo (desde raíz)
cd ..
pnpm dev
```

**Comandos Rápidos** (desde directorio raíz):

```bash
pnpm dev          # Iniciar backend + frontend en paralelo
pnpm db:dev       # Iniciar solo base de datos
pnpm db:stop      # Detener base de datos
pnpm docker:up    # Iniciar todo en Docker
pnpm docker:down  # Detener todos los servicios Docker
```

## 📝 Variables de Entorno

### Backend (.env en backend/)

```env
DATABASE_URL=postgresql://postgres:password@localhost:5433/stechs_db
NODE_ENV=development
PORT=3001
HOST=0.0.0.0
```

### Frontend (.env.local en frontend/)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 🐳 Comandos Docker

```bash
# Iniciar todos los servicios
docker compose up -d

# Ver logs
docker compose logs -f [servicio]  # servicio: db, backend, frontend

# Reiniciar un servicio
docker compose restart [servicio]

# Detener todos los servicios
docker compose down

# Detener y eliminar volúmenes (⚠️ elimina base de datos)
docker compose down -v

# Reconstruir después de cambios en Dockerfile
docker compose build [servicio]
docker compose up -d
```

## 📚 Más Información

- [README del Backend](./backend/README.md) - Documentación de la API
- [README del Frontend](./frontend/README.md) - Documentación del frontend
