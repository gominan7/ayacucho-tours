## 1. Migraciones de Base de Datos

- [x] 1.1 Crear el archivo de migración `20260713000002_create_paquetes_table.sql` en `supabase/migrations/` para definir la tabla `paquetes`, incluyendo columnas `id`, `nombre`, `destino`, `descripcion`, `precio`, `created_at` y `updated_at`.
- [x] 1.2 Definir la restricción de unicidad (`UNIQUE`) para la columna `nombre` y la restricción `CHECK (precio > 0)` para el precio en la migración.
- [x] 1.3 Habilitar RLS (Row Level Security) y definir políticas que permitan `SELECT` para todos los usuarios autenticados, e `INSERT` y `UPDATE` únicamente para usuarios autenticados que pertenezcan al rol "Administrador".
- [x] 1.4 Crear e incluir el trigger de auditoría de fechas para actualizar automáticamente la columna `updated_at` en cambios de la tabla `paquetes`.

## 2. Tipos y Esquemas de Validación

- [x] 2.1 Crear el archivo `apps/web/features/tour-packages/types/package.ts` para definir las interfaces TypeScript de Paquete, payload de creación y payload de actualización.
- [x] 2.2 Crear el archivo `apps/web/features/tour-packages/schemas/packageSchema.ts` definiendo el esquema de validación de Zod para formularios de paquete turístico.

## 3. Server Actions

- [x] 3.1 Implementar la Server Action `createPackage` en `apps/web/features/tour-packages/actions/createPackage.ts` para insertar un paquete tras validar la unicidad del nombre.
- [x] 3.2 Implementar la Server Action `updatePackage` en `apps/web/features/tour-packages/actions/updatePackage.ts` para modificar la información del paquete.

## 4. Componentes de UI de Paquetes

- [x] 4.1 Implementar `PackageForm.tsx` en `apps/web/features/tour-packages/components/PackageForm.tsx` usando `react-hook-form` y los inputs del sistema de diseño para crear/editar paquetes.
- [x] 4.2 Implementar `PackageTable.tsx` en `apps/web/features/tour-packages/components/PackageTable.tsx` para mostrar la lista de paquetes en formato de tabla, con campo de búsqueda reactivo y botones de acción (editar).

## 5. Vistas y Enlaces del Sistema

- [x] 5.1 Crear la ruta `/tour-packages` en `apps/web/app/tour-packages/page.tsx` para renderizar el listado y la búsqueda de paquetes turísticos, con acceso restringido para Administradores.
- [x] 5.2 Crear la ruta `/tour-packages/new` en `apps/web/app/tour-packages/new/page.tsx` para mostrar el formulario de creación.
- [x] 5.3 Crear la ruta `/tour-packages/[id]/edit` en `apps/web/app/tour-packages/[id]/edit/page.tsx` para mostrar el formulario de edición de paquetes.
- [x] 5.4 Actualizar el archivo `apps/web/middleware.ts` para denegar el acceso a la ruta `/tour-packages` y sus subrutas a usuarios con rol "Vendedor" (redireccionando a `/dashboard`).
