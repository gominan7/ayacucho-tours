## Why

Permite a los usuarios autorizados visualizar un resumen del estado del sistema mediante indicadores y gráficos simples.

## What Changes

- **Página de Dashboard (`/dashboard`)**: Implementación completa de la vista del Dashboard.
- **Tarjetas Resumen**: Indicadores con los conteos totales de clientes, paquetes turísticos, reservas, ventas y pagos.
- **Gráficos Estadísticos**: 
  - Gráfico de reservas.
  - Gráfico de ventas por método de pago (Efectivo, Transferencia, Tarjeta).
- **Tabla de Últimas Reservas**: Listado con las 5 reservas más recientes del sistema, mostrando cliente, paquete, fecha.
- **Server Actions**: Implementación de acciones del servidor para realizar las consultas y agregaciones en la base de datos Supabase.

## Capabilities

### New Capabilities
- `dashboard`: Proporciona indicadores clave de rendimiento, gráficos estadísticos de reservas y ventas, y el listado de reservas recientes para el control diario.

### Modified Capabilities

## Impact

- **Rutas (Next.js App Router)**: Desarrollo de la página `/dashboard` existente para renderizar los nuevos componentes dinámicos en lugar del marcador de posición.
- **Componentes**: Creación de componentes específicos para el Dashboard (`KpiCard`, `StatusChart`, `PaymentMethodChart`, `RecentReservationsTable`).
- **Base de Datos**: Consultas de agregación (COUNT) sobre las tablas `clientes`, `paquetes`, `reservas`, `ventas` y `pagos`.
