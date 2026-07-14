## Why

La agencia de viajes AYACUCHO TOURS requiere una funcionalidad comercial clave que permita registrar, listar, editar y buscar reservas de paquetes turísticos para sus clientes. Este módulo es el nexo principal entre el catálogo de paquetes y el flujo de ventas/pagos, permitiendo registrar la cantidad de pasajeros, la fecha programada y el estado de la reserva. Su implementación ahora sienta las bases del módulo de ventas (RF-006).

## What Changes

- **Base de Datos**: Creación de la tabla `reservas` con llaves foráneas hacia `clientes` y `paquetes`.
- **Backend (Server Actions)**: Implementación de acciones de servidor para crear y actualizar reservas.
- **Frontend / UI**:
  - Formulario de creación y edición de reservas (`ReservationForm`), permitiendo seleccionar clientes y paquetes turísticos existentes de listas desplegables.
  - Tabla interactiva para listar reservas (`ReservationTable`), con barra de búsqueda para filtrar dinámicamente por nombre de cliente o nombre del paquete turístico.
- **Rutas y Seguridad**:
  - Implementación de las rutas `/reservations`, `/reservations/new` y `/reservations/[id]/edit` accesibles para los roles `Administrador` y `Vendedor`.
  - Registro del enlace "Reservas" en el menú de navegación general (`Navbar`) para usuarios autenticados.

## Capabilities

### New Capabilities
- `reservations`: Permite la creación, edición, listado y búsqueda reactiva de reservas de paquetes turísticos asociadas a clientes.

### Modified Capabilities
*No se modifican comportamientos ni requerimientos de especificaciones existentes.*

## Impact

- **Base de Datos**: Nueva tabla `reservas`.
- **Middleware**: La ruta `/reservations` y subrutas ya se encuentran en el grupo de rutas protegidas de inicio de sesión, y se permitirá el acceso tanto a administradores como a vendedores.
- **Componentes Globales**: Modificación menor en `Navbar.tsx` para mostrar la sección de "Reservas" a todos los usuarios autorizados (Administrador y Vendedor).
