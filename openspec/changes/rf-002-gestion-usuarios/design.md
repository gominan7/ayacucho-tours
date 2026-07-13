## Context

RF-002 extiende el sistema AYACUCHO TOURS añadiendo el módulo de Gestión de Usuarios, exclusivo para el rol `Administrador`. Las tablas `roles` y `usuarios` ya fueron creadas en RF-001 mediante migración SQL. La integración con Supabase Auth es el punto de mayor atención: crear un usuario requiere usar la **Service Role Key** (clave secreta), que nunca debe exponerse al cliente.

## Goals / Non-Goals

**Goals:**
- Proveer una interfaz para listar, registrar, editar rol y cambiar estado de usuarios.
- Restringir el acceso al módulo `/users` únicamente al rol `Administrador`.
- Usar la Admin API de Supabase para crear usuarios en `auth.users` desde el servidor.
- Respetar la eliminación lógica (BR-003, BR-025): solo `estado = 'Activo' | 'Inactivo'`.

**Non-Goals:**
- No se implementará recuperación/restablecimiento de contraseña en esta versión.
- No se implementará historial de cambios de usuarios.
- No se gestionarán permisos granulares adicionales a los dos roles existentes.

## Decisions

### 1. Creación de usuarios vía Server Action (Admin API)
- **Decisión:** Implementar la creación de usuarios mediante una **Next.js Server Action** que use `@supabase/supabase-js` con la `SUPABASE_SERVICE_ROLE_KEY` almacenada únicamente en variables de entorno del servidor (sin prefijo `NEXT_PUBLIC_`). El Server Action llama a `supabase.auth.admin.createUser()` y luego inserta el registro en `usuarios`.
- **Alternativa considerada:** Hacer la llamada desde el cliente usando la clave publicable. Se descartó porque la Admin API requiere la service role key, que nunca debe enviarse al navegador.
- **Razón:** Mantiene el secreto seguro y centraliza la lógica de creación en el servidor, coherente con el uso de Server Components y Server Actions del stack aprobado.

### 2. Protección de ruta `/users` por rol
- **Decisión:** Extender el `middleware.ts` creado en RF-001 para que, además de verificar la sesión activa, consulte el campo `rol_id` del usuario en la tabla `usuarios` y restrinja `/users` solo a `Administrador`.
- **Alternativa considerada:** Verificar el rol únicamente en los Server Components de la página. Se descartó porque el Middleware opera en la capa Edge y evita que se renderice contenido protegido antes de la verificación.
- **Razón:** Defensa en profundidad: verificación en Edge (Middleware) + validación en Server Action.

### 3. Edición limitada (solo rol, no correo)
- **Decisión:** El formulario de edición expone únicamente el campo `rol`. El correo electrónico es el identificador en Supabase Auth y no puede cambiarse mediante este flujo sin una operación más compleja de reautenticación.
- **Razón:** Reduce complejidad y respeta la integridad del identificador de Auth (BR-029).

### 4. Cambio de estado como eliminación lógica
- **Decisión:** Implementar las acciones "Activar" e "Inactivar" como actualizaciones del campo `estado` en la tabla `usuarios`. No se llama a ninguna API de eliminación de Supabase Auth.
- **Razón:** Cumple BR-003 y BR-025 (trazabilidad y eliminación lógica). El usuario inactivo sigue existiendo en Auth pero el sistema lo bloquea al iniciar sesión.

### 5. Estructura de carpetas (Feature-Based Architecture)
```
apps/web/features/users/
  actions/
    createUser.ts      ← Server Action (Admin API)
    updateUser.ts      ← Server Action
    toggleUserStatus.ts ← Server Action
  components/
    UserTable.tsx
    UserForm.tsx
    UserStatusBadge.tsx
  types/
    user.ts
apps/web/app/users/
  page.tsx             ← Server Component (listado)
  new/
    page.tsx           ← Server Component (formulario creación)
  [id]/
    edit/
      page.tsx         ← Server Component (formulario edición)
```

## Risks / Trade-offs

- **[Risk]** La `SUPABASE_SERVICE_ROLE_KEY` debe mantenerse exclusivamente en el servidor → **Mitigación:** Usar sin prefijo `NEXT_PUBLIC_` y acceder solo desde Server Actions o Route Handlers.
- **[Risk]** Si el Server Action falla después de crear el usuario en Auth pero antes de insertar en `usuarios`, el usuario quedará huérfano en Auth → **Mitigación:** Usar un bloque try/catch que llame a `supabase.auth.admin.deleteUser()` en caso de error en la inserción de `usuarios` (rollback manual para MVP).
- **[Risk]** El Middleware no tiene acceso al rol del usuario sin una consulta adicional a la DB → **Mitigación:** Guardar el nombre del rol en un claim personalizado del JWT de Supabase (`app_metadata.role`) al crear el usuario, permitiendo leerlo sin consultar la DB en cada request.
