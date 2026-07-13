## 1. Preparación e Infraestructura

- [x] 1.1 Agregar la variable de entorno `SUPABASE_SERVICE_ROLE_KEY` (sin prefijo `NEXT_PUBLIC_`) en `apps/web/.env.local` para habilitar la Admin API en el servidor.
- [x] 1.2 Instalar los componentes shadcn/ui necesarios: `table`, `badge`, `dialog`, `select`, `dropdown-menu` usando `npx shadcn add`.
- [x] 1.3 Definir los tipos TypeScript compartidos en `apps/web/features/users/types/user.ts` (interfaces `UserRow`, `RoleRow`, `CreateUserPayload`, `UpdateUserPayload`).

## 2. Server Actions (Lógica de Negocio)

- [x] 2.1 Crear `apps/web/features/users/actions/createUser.ts`: Server Action que usa la Admin API de Supabase para crear el usuario en `auth.users` y luego insertar en `usuarios`. Incluir rollback manual si la inserción en `usuarios` falla.
- [x] 2.2 Crear `apps/web/features/users/actions/updateUser.ts`: Server Action para actualizar el `rol_id` de un usuario existente en la tabla `usuarios`.
- [x] 2.3 Crear `apps/web/features/users/actions/toggleUserStatus.ts`: Server Action para cambiar el campo `estado` entre `'Activo'` e `'Inactivo'` en la tabla `usuarios`.

## 3. Protección de Ruta por Rol

- [x] 3.1 Extender `apps/web/middleware.ts` para leer el rol del usuario desde `app_metadata.role` del JWT y redirigir a `/dashboard` si un `Vendedor` intenta acceder a cualquier subruta de `/users`.
- [x] 3.2 Al crear un nuevo usuario (Task 2.1), establecer `app_metadata: { role: 'Administrador' | 'Vendedor' }` mediante `supabase.auth.admin.createUser()` para que el Middleware pueda leerlo del JWT sin consultar la DB.

## 4. Componentes de UI

- [x] 4.1 Crear `apps/web/features/users/components/UserStatusBadge.tsx`: Componente `Badge` de shadcn/ui que renderiza "Activo" en verde y "Inactivo" en rojo/gris según el valor del campo `estado`.
- [x] 4.2 Crear `apps/web/features/users/components/UserTable.tsx`: Tabla con columnas Correo, Rol, Estado y Acciones. Las acciones (Editar, Activar/Inactivar) se agrupan en un `DropdownMenu`. Incluir estado vacío con mensaje y botón de acción.
- [x] 4.3 Crear `apps/web/features/users/components/UserForm.tsx`: Formulario reutilizable para registro y edición. Campos: correo (solo en creación), contraseña (solo en creación), rol (`Select` con opciones de la tabla `roles`). Validación con `zod` y `react-hook-form`.

## 5. Páginas (App Router)

- [x] 5.1 Crear `apps/web/app/users/page.tsx`: Server Component que consulta todos los usuarios de la tabla `usuarios` y renderiza `UserTable`. Incluir encabezado de módulo con título, descripción y botón "Registrar Usuario".
- [x] 5.2 Crear `apps/web/app/users/new/page.tsx`: Server Component que consulta los roles disponibles y renderiza `UserForm` en modo creación, conectado al Server Action `createUser`.
- [x] 5.3 Crear `apps/web/app/users/[id]/edit/page.tsx`: Server Component que obtiene el usuario por `id` y los roles disponibles, renderiza `UserForm` en modo edición (solo campo rol), conectado al Server Action `updateUser`.
