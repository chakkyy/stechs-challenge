# Backend API

Backend para el proyecto Stechs Challenge - API con tRPC, Prisma y PostgreSQL.

## Stack Tecnológico

- **Node.js 18+** - Runtime
- **TypeScript** - Lenguaje
- **Fastify** - Framework web
- **tRPC** - APIs con tipado seguro
- **Prisma 6** - ORM
- **PostgreSQL 16** - Base de datos
- **Docker** - Contenedores
- **Zod** - Validación de schemas

## 🤔 ¿Por qué tRPC? Decisiones de Arquitectura

### El Problema

Las APIs REST tradicionales con TypeScript enfrentan varios desafíos:

- **Deriva de tipos**: Los tipos del frontend y backend pueden desincronizarse
- **Definiciones manuales de tipos**: Necesidad de mantener definiciones separadas o usar generación de código
- **Validación en runtime**: Debe validar peticiones aunque TypeScript "garantice" tipos
- **Boilerplate**: Mucho código repetitivo para endpoints, validación, manejo de errores

### Por qué tRPC sobre Alternativas

#### vs REST + OpenAPI/Swagger

**Ventajas de tRPC:**

- ✅ **Cero generación de código** - Los tipos se infieren directamente del backend
- ✅ **Tipado seguro instantáneo** - Refactorizar backend → errores en frontend inmediatamente
- ✅ **Menos boilerplate** - No necesita DTOs, controladores, definiciones de rutas
- ✅ **Mejor DX** - Autocompletado para todos los procedimientos, parámetros y respuestas

**Compromisos:**

- ❌ **Solo TypeScript** - No apto para clientes no-TS (apps móviles, APIs externas)
- ❌ **Monorepo preferido** - Funciona mejor cuando frontend/backend comparten tipos
- ⚠️ **Ecosistema menos maduro** - Menos herramientas comparado con REST

**Decisión:** Como es un monorepo TypeScript con Next.js + Node.js, tRPC es ideal. Si necesitara API pública, agregaría endpoints REST junto a tRPC.

#### vs GraphQL

**Ventajas de tRPC:**

- ✅ **Más simple** - No hay lenguaje de schema que aprender, no resolvers, no problemas N+1
- ✅ **Bundle más pequeño** - Sin librerías pesadas de cliente GraphQL
- ✅ **Mejor integración TypeScript** - TS nativo, no tipos generados

**Compromisos:**

- ❌ **Sin flexibilidad de query** - No se pueden pedir campos específicos como GraphQL
- ❌ **Sin federación** - No se pueden combinar múltiples servicios fácilmente

**Decisión:** Para una API CRUD con requisitos de datos simples, la simplicidad de tRPC gana. GraphQL sería excesivo.D

#### vs gRPC

**Ventajas de tRPC:**

- ✅ **Nativo para web** - Funciona sobre HTTP/JSON, sin protobuf
- ✅ **Amigable con navegador** - No necesita herramientas especiales
- ✅ **TypeScript-first** - Diseñado para TS, no adaptado después

**Compromisos:**

- ❌ **Menos performante** - JSON vs protobuf binario
- ❌ **Sin streaming** - gRPC tiene mejor soporte de streaming

**Decisión:** Para una aplicación web, HTTP/JSON es más práctico que protobuf. La diferencia de rendimiento es insignificante para este caso de uso.

### Lo que tRPC Aporta a Este Proyecto

1. **Tipado Seguro End-to-End**

   ```typescript
   // Backend define procedimiento
   cableModem: {
     create: publicProcedure.input(schema).mutation(...)
   }

   // Frontend obtiene tipos completos automáticamente
   const { mutate } = trpc.cableModem.create.useMutation()
   //                        ^--- Autocompletado + verificación de tipos
   ```

2. **Validación Integrada**
   - Esquemas Zod validan en runtime
   - TypeScript valida en tiempo de compilación
   - Única fuente de verdad para ambos

3. **Manejo de Errores**
   - Errores tipados con códigos HTTP apropiados
   - Códigos de error personalizados (NOT_FOUND, CONFLICT, etc.)
   - Serialización automática de errores

4. **Experiencia de Desarrollador**
   - Refactorizar procedimiento → Frontend muestra errores inmediatamente
   - Renombrar campo → Encontrar todos los usos en frontend/backend
   - Cambiar validación → Frontend conoce nuevas restricciones

### Compromisos que Acepté

1. **Dependencia de proveedor**: Ligado al ecosistema tRPC
   - **Mitigación**: tRPC es open source, comunidad activa, respaldado por Vercel
2. **Curva de aprendizaje**: Necesita aprender patrones tRPC
   - **Mitigación**: Más simple que GraphQL, excelente documentación
3. **Overhead HTTP**: No tan eficiente como gRPC
   - **Mitigación**: Para esta escala (<1000 usuarios), HTTP/JSON está bien
4. **Sin API Pública**: No se puede exponer fácilmente a clientes no-TS
   - **Mitigación**: Si se necesita después, se pueden agregar endpoints REST junto a tRPC

### Consideraciones de Rendimiento

- **Batching**: tRPC agrupa múltiples queries en una sola petición HTTP
- **Caching**: Funciona con React Query para caché automático
- **Tamaño de bundle**: ~5KB gzipped (vs ~50KB para Apollo GraphQL)
- **Tiempo de respuesta**: Igual que REST (HTTP/JSON), más rápido que resolvers GraphQL

### Enfoques Alternativos Considerados

1. **REST + Zod + tRPC-OpenAPI**
   - Podría generar OpenAPI desde procedimientos tRPC
   - Agrega complejidad, decidí mantenerlo simple
   - Se puede agregar después si se necesita API pública

2. **NestJS + GraphQL**
   - Más listo para empresa, mejor para equipos grandes
   - Excesivo para el tamaño de este proyecto
   - Curva de aprendizaje más pronunciada

3. **Fastify + TypeBox**
   - Similar a tRPC pero sin integración frontend
   - Se perdería tipado seguro end-to-end
   - Más trabajo manual

### Cuándo NO Usar tRPC

- ❌ **APIs Públicas** - Usar REST/GraphQL para consumidores externos
- ❌ **Apps móviles** - A menos que uses React Native con tipos compartidos
- ❌ **Microservicios** - gRPC es mejor para comunicación servicio-a-servicio
- ❌ **No-TypeScript** - Obviamente requiere TypeScript

### Conclusión

Para un **monorepo TypeScript** con **API interna** y necesidades de **desarrollo rápido**, tRPC es la mejor elección. Elimina una clase entera de bugs (desajuste de tipos) mientras reduce boilerplate y mejora la experiencia de desarrollador.

El compromiso es dependencia de proveedor y clientes solo-TypeScript, pero para este proyecto, son restricciones aceptables dadas las enormes mejoras en DX.

## 🚀 Setup Rápido (Desarrollo Local)

### 1. Instalar dependencias

```bash
cd backend
pnpm install
```

### 2. Levantar la base de datos

```bash
docker compose up -d
```

Esto levanta PostgreSQL en `localhost:5433` (puerto 5433 para evitar conflictos con instancias locales).

### 3. Configurar variables de entorno

El archivo `.env` ya debería existir. Si no, créalo:

```bash
cp .env.example .env
```

Contenido del `.env`:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5433/stechs_db"
NODE_ENV=development
PORT=3001
HOST=0.0.0.0
```

### 4. Correr migraciones

```bash
npx prisma migrate deploy
```

### 5. Poblar la base de datos (seed)

```bash
pnpm db:seed
```

Esto crea 6 cable modems de ejemplo.

### 6. Verificar que todo funciona

```bash
npx prisma studio
```

Abre Prisma Studio en `http://localhost:5555` y verifica que el modelo `CableModem` tiene 6 registros.

---

## 📦 Comandos Útiles

### Desarrollo

```bash
pnpm dev              # Inicia el servidor en modo desarrollo (hot reload)
pnpm build            # Compila TypeScript a JavaScript
pnpm start            # Inicia el servidor en modo producción
pnpm type-check       # Verifica tipos de TypeScript
```

### Base de Datos

```bash
# Prisma
pnpm db:studio                   # Abre GUI de la base de datos
pnpm db:migrate                  # Crea y aplica una nueva migración
pnpm db:migrate:deploy           # Aplica migraciones (producción)
pnpm db:generate                 # Regenera Prisma Client
pnpm db:seed                     # Pobla la DB con datos de prueba
pnpm db:push                     # Sincroniza schema sin crear migración
pnpm db:reset                    # ⚠️ Resetea DB (borra todo)

# Docker
docker compose up -d             # Levanta PostgreSQL en background
docker compose down              # Detiene PostgreSQL
docker compose logs db           # Ver logs de PostgreSQL
docker compose down -v           # Detiene y ELIMINA todos los datos
docker compose restart           # Reinicia el contenedor
```

---

## 📁 Estructura del Proyecto

```
backend/
├── prisma/
│   ├── schema.prisma              # Schema de la base de datos
│   ├── seed.ts                    # Script para poblar datos
│   └── migrations/                # Migraciones (commitear todo esto)
│       ├── migration_lock.toml    # Lock del provider (PostgreSQL)
│       └── 20251121184025_init/
│           └── migration.sql      # SQL de la migración inicial
├── src/
│   ├── app.ts                     # Entry point de Fastify
│   ├── db.ts                      # Cliente de Prisma (singleton)
│   ├── routers/                   # Routers de tRPC
│   │   └── index.ts
│   └── services/                  # Lógica de negocio
├── docker-compose.yml             # Configuración de PostgreSQL
├── .env                           # Variables de entorno (NO commitear)
├── .env.example                   # Template de .env (SÍ commitear)
├── package.json
└── tsconfig.json
```

---

## 🗄️ Base de Datos

### Schema

La tabla principal es `cable_modems`:

```prisma
model CableModem {
  id          String           @id @default(uuid())
  name        String           @unique
  description String?
  status      CableModemStatus @default(Active)
  validSince  DateTime?
  tags        String[]
  createdAt   DateTime         @default(now())
  updatedAt   DateTime         @updatedAt
}

enum CableModemStatus {
  Active
  Suspended
  Provision
}
```

### Datos de Seed

El script `prisma/seed.ts` crea 6 cable modems:

1. CM 100 MB (Active)
2. CM 200 MB Pro (Active)
3. CM 50 MB Legacy (Suspended)
4. CM 1 GB Fiber (Provision)
5. CM 300 MB (Active)
6. CM 100 MB V2 (Active)

---

## 🔧 Troubleshooting

### Error: "Can't reach database server at localhost:5433"

```bash
# Verificar que Docker está corriendo
docker ps

# Si no aparece el contenedor, levantarlo
docker compose up -d

# Ver logs para debug
docker compose logs db
```

### Error: "User was denied access on the database"

Verificar que el `.env` tiene las credenciales correctas:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5433/stechs_db"
```

### Resetear la base de datos completamente

```bash
# 1. Detener y eliminar volúmenes
docker compose down -v

# 2. Levantar de nuevo
docker compose up -d

# 3. Esperar 5 segundos para que inicie
sleep 5

# 4. Aplicar migraciones
npx prisma migrate deploy

# 5. Poblar datos
pnpm db:seed
```

### Puerto 5432 ya está en uso

Si tienes PostgreSQL instalado localmente, usa el puerto 5433 (ya configurado en `docker-compose.yml`).

---

## 🌐 API Endpoints

Una vez que el servidor esté corriendo (`pnpm dev`):

- **Health Check**: http://localhost:3001/health
- **tRPC Endpoint**: http://localhost:3001/api/trpc
- **Prisma Studio**: http://localhost:5555 (ejecutar `npx prisma studio`)

### Endpoints de tRPC

- `cableModems` - Listar todos los cable modems (con filtros opcionales)
- `cableModem.byId` - Obtener un cable modem por ID
- `cableModem.create` - Crear un cable modem
- `cableModem.update` - Actualizar un cable modem
- `cableModem.delete` - Eliminar un cable modem

---

## 📝 Notas Importantes

- **Prisma 6**: Usamos Prisma 6 (no 7) para compatibilidad con el ejemplo de referencia
- **Puerto 5433**: Evita conflictos con PostgreSQL local (que usa 5432)
- **Commitear migraciones**: Siempre commitea `prisma/migrations/` completo
- **No commitear .env**: El archivo `.env` está en `.gitignore`

---

## 🔐 Variables de Entorno

Ver `.env.example` para el template completo:

| Variable       | Descripción                     | Default                                                   |
| -------------- | ------------------------------- | --------------------------------------------------------- |
| `DATABASE_URL` | Connection string de PostgreSQL | `postgresql://postgres:password@localhost:5433/stechs_db` |
| `NODE_ENV`     | Entorno de ejecución            | `development`                                             |
| `PORT`         | Puerto del servidor             | `3001`                                                    |
| `HOST`         | Host del servidor               | `0.0.0.0`                                                 |

---

## 📚 Recursos

- [Prisma Docs](https://www.prisma.io/docs)
- [tRPC Docs](https://trpc.io/docs)
- [Fastify Docs](https://www.fastify.io/docs/latest/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)

---

## License

MIT
