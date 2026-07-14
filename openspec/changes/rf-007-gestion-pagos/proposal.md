## Why

Permite registrar y gestionar los pagos de las ventas realizadas por la agencia de turismo "AYACUCHO TOURS".

## What Changes

- **Base de Datos**: Creación de la tabla `pagos` relacionada con la tabla `ventas` para registrar cada pago.
- **Acceso y Navegación**: Incorporación del enlace a `/payments` en el menú de navegación (`Navbar.tsx`) accesible solo por Administradores y Vendedores.
- **Interfaz de Usuario**:
  - Vista de listado de pagos con buscador por nombre de cliente o ID/número de venta.
  - Formulario para registrar un pago nuevo asociándolo a una venta existente.
  - Formulario para editar un pago registrado.
- **Server Actions**: Implementación de Server Actions para listar, registrar y editar pagos.
- **Seguridad**: Protección del acceso en base al rol de usuario mediante middleware.

## Capabilities

### New Capabilities
- `payment-management`: Permite el registro, listado, edición y búsqueda de pagos asociados a ventas.

### Modified Capabilities

## Impact

- **Base de Datos (Supabase)**: Nueva migración SQL para definir la tabla `pagos`.
- **Rutas (Next.js)**: Nueva ruta `/payments` y subrutas para registrar y editar pagos.
- **Navegación (`Navbar.tsx`)**: Integración visual en la barra de navegación para usuarios autorizados.
- **Server Actions**: Adición de la lógica de negocio y base de datos en `apps/web/features/payments/actions/`.

