## Why

El sistema AYACUCHO TOURS requiere que únicamente usuarios registrados y habilitados por un Administrador puedan acceder al sistema (BR-003, BR-028). Actualmente no existe ningún módulo para que el Administrador gestione dichos usuarios desde la aplicación, lo que obliga a hacerlo directamente en Supabase, creando una dependencia operativa inaceptable para el MVP.

## What Changes

- **Listado de Usuarios**: Vista con tabla paginada que muestra todos los usuarios del sistema junto con su correo, rol y estado (Activo / Inactivo).
- **Registro de Usuarios**: Formulario para crear un nuevo usuario en Supabase Auth y en la tabla `usuarios` asignándole un rol (`Administrador` o `Vendedor`) y marcándolo como Activo por defecto.
- **Edición de Usuarios**: Formulario para modificar el rol de un usuario existente. El correo electrónico no podrá editarse por ser el identificador de Supabase Auth.
- **Activar / Inactivar Usuarios**: Acción para cambiar el campo `estado` de un usuario entre `'Activo'` e `'Inactivo'` sin eliminar físicamente el registro (BR-003, BR-025).
- **Restricción de Acceso**: Solo el rol `Administrador` podrá acceder a la ruta `/users` y sus subrutas (BR-026, BR-027).

## Capabilities

### New Capabilities

- `user-management`: Administración completa del ciclo de vida de usuarios del sistema: listar, registrar, editar rol y cambiar estado (activar/inactivar). Aplica únicamente al rol Administrador.

### Modified Capabilities

*(Ninguna — los requerimientos de autenticación de RF-001 permanecen sin cambios.)*

## Impact

- **Nuevas Rutas**: `/users` (listado), `/users/new` (registro), `/users/[id]/edit` (edición).
- **Base de Datos**: Uso de las tablas `usuarios` y `roles` creadas en RF-001. No se añaden nuevas tablas.
- **Supabase Auth**: Se usará la Admin API de Supabase (`supabase-js` con service role key) para crear usuarios en `auth.users` sin exponer la contraseña en el frontend. La contraseña inicial será generada o definida por el Administrador.
- **Middleware**: La ruta `/users` deberá agregarse a la verificación de rol `Administrador` en el middleware existente.
- **Dependencias**: `@supabase/supabase-js` (ya instalado). Posible adición de componentes shadcn/ui: `Table`, `Badge`, `Dialog`, `Select`.

## Non-Goals

- No se implementará recuperación de contraseña desde la interfaz (corresponde a un flujo de Supabase Auth externo).
- No se implementará historial de cambios de usuarios (puede incorporarse en versiones futuras, BR-024).
- No se gestionarán permisos granulares más allá de los dos roles definidos.
