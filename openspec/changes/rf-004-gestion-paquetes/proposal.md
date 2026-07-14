## Why

Actualmente, el sistema AYACUCHO TOURS no cuenta con un módulo de gestión de paquetes turísticos, lo que impide configurar la oferta de viajes, destinos y precios de la agencia. Implementar el módulo de Gestión de Paquetes Turísticos (RF-004) permitirá al Administrador registrar, editar, buscar y listar los paquetes del negocio de forma consistente y segura.

## What Changes

- **Módulo de Gestión de Paquetes Turísticos**:
  - Interfaz de listado de paquetes (`/tour-packages`) accesible únicamente para Administradores.
  - Formulario de registro de nuevo paquete turístico (`/tour-packages/new`) con validaciones de campos obligatorios, precio mayor que cero y nombre único.
  - Formulario de edición de paquete turístico existente (`/tour-packages/[id]/edit`) para actualizar datos del paquete.
  - Barra de búsqueda por nombre o destino en la vista de listado de paquetes.
- **Integridad y Lógica de Datos**:
  - Creación de Server Actions para registrar y actualizar paquetes turísticos utilizando Supabase.
- **Seguridad**:
  - Configuración del Middleware para asegurar que solo los usuarios con rol de Administrador puedan acceder a la gestión de paquetes turísticos.

## Capabilities

### New Capabilities
- `tour-packages`: Gestión completa de paquetes turísticos que abarca el listado, búsqueda por nombre o destino, registro y edición de información de la oferta turística del negocio.

### Modified Capabilities

## Impact

- **Base de Datos**: Creación de la tabla `paquetes` en la base de datos de Supabase.
- **Middleware**: Inclusión de la ruta `/tour-packages` y subrutas en la lista de rutas protegidas específicas para Administradores.
- **Estructura de Carpetas**: Creación de componentes, tipos y acciones en `apps/web/features/tour-packages/` y vistas en `apps/web/app/tour-packages/`.
