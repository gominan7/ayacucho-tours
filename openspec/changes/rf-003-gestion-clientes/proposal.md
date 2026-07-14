## Why

Actualmente, el sistema AYACUCHO TOURS no cuenta con un módulo de gestión de clientes, lo que impide registrar a los viajeros y asociar sus datos (nombre, documento de identidad, etc.) a futuras reservas y ventas. Implementar la funcionalidad de gestión de clientes (RF-003) permitirá a los roles de Administrador y Vendedor crear, editar, buscar y listar los clientes del negocio de forma segura y consistente.

## What Changes

- **Módulo de Gestión de Clientes**:
  - Interfaz de listado de clientes (`/clients`) accesible para Administradores y Vendedores.
  - Formulario de registro de nuevo cliente (`/clients/new`) con validaciones de campos obligatorios y documento de identidad único.
  - Formulario de edición de cliente existente (`/clients/[id]/edit`) para actualizar datos del cliente.
  - Barra de búsqueda por nombre o documento de identidad en la vista de listado.
- **Integridad y Lógica de Datos**:
  - Creación de Server Actions para realizar las operaciones CRUD (insertar, actualizar y desactivar/activar) de clientes utilizando Supabase.
- **Seguridad**:
  - Protección de rutas en el Middleware para restringir el acceso al módulo `/clients` a usuarios autenticados (Administradores y Vendedores).

## Capabilities

### New Capabilities
- `client-management`: Gestión completa de clientes que abarca el listado, búsqueda, registro y edición de información de los viajeros de la plataforma por parte de Administradores y Vendedores.

### Modified Capabilities
<!-- No modified capabilities for this change -->

## Impact

- **Base de Datos**: Creación de la tabla `clientes` en Supabase.
- **Middleware**: Inclusión de la ruta `/clients` y subrutas en la lista de rutas protegidas.
- **Navegación**: Modificación de la barra de navegación (`Navbar.tsx`) para incluir el enlace al módulo de Clientes.
- **Estructura de Carpetas**: Creación de componentes, tipos y acciones en `apps/web/features/clients/` y vistas en `apps/web/app/clients/`.
