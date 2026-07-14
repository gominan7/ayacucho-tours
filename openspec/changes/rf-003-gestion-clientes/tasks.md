## 1. Migraciones de Base de Datos

- [x] 1.1 Crear el archivo de migración `20260713000001_create_clientes_table.sql` en `supabase/migrations/` para definir la tabla `clientes`, incluyendo columnas `id`, `nombre_completo`, `tipo_documento`, `nro_documento`, `email`, `telefono`, `is_active`, `created_at` y `updated_at`.
- [x] 1.2 Definir la restricción de unicidad (`UNIQUE`) para la columna `nro_documento` en la migración.
- [x] 1.3 Habilitar RLS (Row Level Security) y definir políticas que permitan `SELECT`, `INSERT` y `UPDATE` para usuarios autenticados que pertenezcan a los roles "Administrador" o "Vendedor".
- [x] 1.4 Crear e incluir el trigger de auditoría de fechas para actualizar automáticamente la columna `updated_at` en cambios.

## 2. Tipos y Esquemas de Validación

- [x] 2.1 Crear el archivo `apps/web/features/clients/types/client.ts` para definir las interfaces TypeScript de Cliente, payload de creación y payload de actualización.
- [x] 2.2 Crear el archivo `apps/web/features/clients/schemas/clientSchema.ts` definiendo el esquema de validación de Zod para formularios de cliente.

## 3. Server Actions

- [x] 3.1 Implementar la Server Action `createClient` en `apps/web/features/clients/actions/createClient.ts` para insertar un cliente tras validar la unicidad del documento.
- [x] 3.2 Implementar la Server Action `updateClient` en `apps/web/features/clients/actions/updateClient.ts` para modificar la información del cliente.
- [x] 3.3 Implementar la Server Action `toggleClientStatus` en `apps/web/features/clients/actions/toggleClientStatus.ts` para habilitar o deshabilitar lógicamente a un cliente.

## 4. Componentes de UI de Clientes

- [x] 4.1 Implementar `ClientForm.tsx` en `apps/web/features/clients/components/ClientForm.tsx` usando `react-hook-form` y los inputs visuales del sistema de diseño para crear/editar clientes.
- [x] 4.2 Implementar `ClientTable.tsx` en `apps/web/features/clients/components/ClientTable.tsx` para mostrar la lista de clientes en formato de tabla, con campo de búsqueda reactivo y botones de acción (editar y activar/desactivar).

## 5. Vistas y Enlaces del Sistema

- [x] 5.1 Crear la ruta `/clients` en `apps/web/app/clients/page.tsx` para renderizar el listado y la búsqueda de clientes.
- [x] 5.2 Crear la ruta `/clients/new` en `apps/web/app/clients/new/page.tsx` para mostrar el formulario de creación.
- [x] 5.3 Crear la ruta `/clients/[id]/edit` en `apps/web/app/clients/[id]/edit/page.tsx` para mostrar el formulario de edición de clientes.
- [x] 5.4 Actualizar la barra de navegación `Navbar.tsx` para agregar el enlace al módulo de clientes visible para Administradores y Vendedores.
