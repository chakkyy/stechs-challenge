# Frontend - Aplicación Next.js

Frontend de gestión de Cable Modems construido con Next.js, tRPC y shadcn/ui.

## Stack Tecnológico

- **Next.js 14** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Cliente tRPC** - Comunicación API con tipado
- **React Query** - Gestión de estado y caché del servidor
- **shadcn/ui** - Componentes de UI
- **Tailwind CSS** - Estilos utility-first
- **Zod** - Validación de formularios
- **React Hook Form** - Gestión de estado de formularios

## 🚀 Inicio Rápido

### Desarrollo

```bash
# Desde directorio frontend
pnpm dev

# Desde directorio raíz
pnpm dev  # Inicia frontend y backend
```

Frontend corre en http://localhost:3000

### Build de Producción

```bash
pnpm build    # Build de producción
pnpm start    # Iniciar servidor de producción
```

## 📁 Estructura del Proyecto

```
frontend/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Layout raíz con providers
│   ├── page.tsx             # Página de inicio
│   ├── globals.css          # Estilos globales
│   └── cable-modem/
│       └── [id]/
│           └── page.tsx     # Página de detalle
├── components/
│   ├── cable-modem/         # Componentes de funcionalidad
│   │   ├── create/          # Modal y formulario de creación
│   │   ├── detail/          # Vista de detalle y eliminación
│   │   ├── filters/         # Búsqueda y filtros
│   │   └── grid/            # Grilla de cable modems
│   ├── layout/              # Componentes de layout
│   ├── providers/           # Providers de React
│   │   └── TRPCProvider.tsx # Configuración tRPC + React Query
│   └── ui/                  # Componentes shadcn/ui
├── contexts/                # Contextos de React
│   └── CableModemFiltersContext.tsx
├── lib/                     # Utilidades
│   ├── trpc-react.ts       # Hooks de tRPC React
│   ├── trpc.ts             # Cliente vanilla tRPC
│   ├── types.ts            # Tipos TypeScript
│   ├── validations.ts      # Esquemas Zod
│   └── utils.ts            # Funciones auxiliares
└── types/                   # Definiciones de tipos
    └── router.d.ts          # Importación de tipo AppRouter
```

## 🔧 Componentes Clave

### Integración con tRPC

El frontend usa tRPC para llamadas API con tipado:

```typescript
// Consultar datos
const { data, isLoading, error } = trpc.cableModems.useQuery();

// Crear un cable modem
const createMutation = trpc.cableModem.create.useMutation({
  onSuccess: () => {
    utils.cableModems.invalidate(); // Refrescar caché
  },
});

// Eliminar un cable modem
const deleteMutation = trpc.cableModem.delete.useMutation();
```

### Gestión de Contexto

`CableModemFiltersContext` gestiona el estado de búsqueda y usa tRPC internamente:

```typescript
const { searchTerm, handleSearch, cableModems, isLoading } = useCableModemFiltersContext();
```

### Validación de Formularios

Los formularios usan esquemas Zod con React Hook Form:

```typescript
const form = useForm<CableModemCreateInput>({
  resolver: zodResolver(cableModemCreateSchema),
  defaultValues: { ... }
});
```

## 🌐 Variables de Entorno

Crear `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Esto indica al frontend dónde está corriendo la API del backend.

## 🎨 Componentes de UI

Construidos con componentes shadcn/ui:

- `Dialog` - Modales (Crear)
- `AlertDialog` - Confirmaciones (Eliminar)
- `Card` - Tarjetas de cable modem
- `Button` - Todos los botones
- `Input` - Inputs de formulario
- `Select` - Menús desplegables
- `Badge` - Badges de estado
- `Calendar` - Selector de fecha

Agregar nuevos componentes:

```bash
npx shadcn-ui@latest add [nombre-componente]
```

## 🔄 Flujo de Datos

1. **Query**: Componente llama hook de query tRPC
2. **Request**: tRPC envía petición HTTP al backend
3. **Caché**: React Query cachea la respuesta
4. **Render**: Componente renderiza con los datos
5. **Mutation**: Acción del usuario dispara mutation
6. **Invalidate**: Caché se invalida
7. **Refetch**: Datos frescos se obtienen automáticamente

## 🎯 Funcionalidades Clave

### Búsqueda y Filtros

```typescript
// La búsqueda es del lado del servidor (backend filtra)
const { data } = trpc.cableModems.useQuery(searchQuery ? { name: searchQuery } : undefined);
```

### Estados de Carga

Todos los componentes manejan carga:

```typescript
if (isLoading) return <Skeleton />;
if (error) return <ErrorMessage />;
return <Content data={data} />;
```

### Manejo de Errores

Los errores se muestran mediante notificaciones toast:

```typescript
mutate(data, {
  onError: (error) => {
    toast({
      title: 'Error',
      description: error.message,
      variant: 'destructive',
    });
  },
});
```

### Invalidación de Caché

Las mutaciones refrescan los datos automáticamente:

```typescript
const utils = trpc.useUtils();

mutate(data, {
  onSuccess: () => {
    utils.cableModems.invalidate(); // Refrescar lista
    utils.cableModem.byId.invalidate(); // Refrescar detalle
  },
});
```

## 🎨 Estilos

### Tailwind CSS

Enfoque utility-first:

```tsx
<div className="flex items-center gap-4 p-6 rounded-lg shadow-md">
  <Button className="bg-primary hover:bg-primary/90">Haz clic</Button>
</div>
```

### Tema

El modo oscuro está habilitado por defecto en `layout.tsx`:

```tsx
<html lang="en" className="dark">
```

### Variables CSS

Personalizar colores en `globals.css`:

```css
:root {
  --primary: ... --secondary: ...;
}
```

## 🧪 Tips de Desarrollo

### Tipado Seguro

tRPC proporciona inferencia completa de tipos:

```typescript
// ✅ TypeScript conoce la forma de data
const { data } = trpc.cableModems.useQuery();
//    ^? CableModem[]

// ✅ TypeScript conoce el input de mutation
createMutation.mutate({
  name: 'CM 100',
  // ^? Autocompletado disponible
});
```

### Hot Reload

Next.js proporciona fast refresh - los cambios aparecen instantáneamente sin perder estado.

### DevTools

- **React Query DevTools**: Inspeccionar caché y queries (en desarrollo)
- **React DevTools**: Inspeccionar árbol de componentes
- **Browser DevTools**: La pestaña Network muestra peticiones batch de tRPC

### Problemas Comunes

**Puerto ya en uso:**

```bash
# Matar proceso en puerto 3000
lsof -ti:3000 | xargs kill -9
```

**Tipos desincronizados:**

```bash
# Reconstruir backend para actualizar tipos
cd backend && pnpm build
```

**Problemas de caché:**

```bash
# Limpiar caché de Next.js
rm -rf .next
```

## 📝 Scripts

```bash
pnpm dev          # Iniciar servidor de desarrollo
pnpm build        # Build de producción
pnpm start        # Iniciar servidor de producción
pnpm lint         # Ejecutar ESLint
pnpm type-check   # Verificación TypeScript
```

## 🔗 Relacionados

- [README Raíz](../README.md) - Visión general del proyecto
- [README del Backend](../backend/README.md) - Documentación de la API

## 📚 Recursos

- [Docs de Next.js](https://nextjs.org/docs)
- [Docs de tRPC](https://trpc.io/docs)
- [Docs de shadcn/ui](https://ui.shadcn.com)
- [Docs de Tailwind CSS](https://tailwindcss.com/docs)
- [Docs de React Query](https://tanstack.com/query/latest)
