# dashboard Specification

## Purpose
TBD - created by archiving change rf-008-dashboard. Update Purpose after archive.
## Requirements
### Requirement: Tarjetas de Resumen General
El sistema SHALL mostrar un conjunto de tarjetas resumen que presenten los totales cuantitativos de las entidades principales del sistema: Clientes, Paquetes Turísticos, Reservas, Ventas y Pagos.

#### Scenario: Visualización de totales en tarjetas resumen
- **WHEN** un usuario con rol de Administrador o Vendedor accede a la ruta `/dashboard`
- **THEN** el sistema SHALL realizar consultas de agregación a la base de datos de Supabase y mostrar en cada tarjeta el número total de registros existentes para cada entidad.

---

### Requirement: Gráficos Estadísticos del Dashboard
El sistema SHALL mostrar dos gráficos simples que representen información del sistema.
1. Gráfico de Reservas.
2. Gráfico de Ventas por Método de Pago.

#### Scenario: Visualización de gráficos estadísticos
- **WHEN** el usuario accede al Dashboard en `/dashboard`
- **THEN** el sistema SHALL mostrar los gráficos con la información correspondiente de reservas y ventas.

---

### Requirement: Listado de Últimas Reservas
El sistema SHALL listar en una tabla de consulta rápida las 5 reservas más recientemente registradas en el sistema.

#### Scenario: Visualización de últimas reservas
- **WHEN** el usuario visualiza la pantalla del Dashboard `/dashboard`
- **THEN** el sistema SHALL mostrar una lista ordenada cronológicamente de forma descendente con las últimas 5 reservas, detallando el nombre del cliente, el nombre del paquete turístico y la fecha de la reserva.

