## Context

El módulo de Gestión de Reservas (RF-005) permitirá registrar, editar, buscar y listar reservas de paquetes turísticos asociándolas a clientes registrados. Este módulo es clave para la trazabilidad comercial y servirá como el paso previo para la facturación de ventas (RF-006) y pagos (RF-007). Las reglas de negocio validan que la cantidad de personas sea mayor que cero y que la reserva esté asociada a un cliente y un paquete existentes.

## Goals / Non-Goals

**Goals:**
- Definir el modelo físico de la tabla `reservas` en la base de datos PostgreSQL, incluyendo llaves foráneas y restricciones.
- Diseñar la lógica de Server Actions para creación y edición de reservas.
- Diseñar los componentes UI de selección de clientes y paquetes, listado, búsqueda reactiva en tiempo real y edición.

**Non-Goals:**
- Administrar el cupo o aforo de reservas por paquete turístico (fuera del alcance del MVP).

## Decisions

### 1. Estructura de la Tabla `reservas`
Crear la tabla `reservas` en Supabase con los siguientes campos:
- `id` (UUID, Primary Key, auto-generado).
- `cliente_id` (UUID, NOT NULL, FK a la tabla `clientes(id)`).
- `paquete_id` (UUID, NOT NULL, FK a la tabla `paquetes(id)`).
- `fecha_reserva` (DATE, NOT NULL).
- `cantidad_personas` (INTEGER, NOT NULL, CHECK (cantidad_personas > 0)).
- `estado` (VARCHAR(50), NOT NULL, DEFAULT 'Pendiente', CHECK (estado IN ('Pendiente', 'Confirmada', 'Cancelada'))).
- `created_at` (TIMESTAMP WITH TIME ZONE, NOT NULL, DEFAULT now()).
- `updated_at` (TIMESTAMP WITH TIME ZONE, NOT NULL, DEFAULT now()).

### 2. Server Actions e Integridad de Negocio
- `createReservation`: Inserta la reserva después de validar los campos mediante Zod. El estado inicial será por defecto `Pendiente`.
- `updateReservation`: Actualiza la información de la reserva.

### 3. Arquitectura de UI y Páginas
- **Rutas (`apps/web/app/reservations/`)**:
  - `page.tsx`: Lista de reservas ordenadas por `created_at DESC`. Carga los datos necesarios haciendo un query join (`clientes(nombre_completo)`, `paquetes(nombre)`).
  - `new/page.tsx`: Carga la lista de clientes y paquetes activos para pasarlos al formulario de creación.
  - `[id]/edit/page.tsx`: Carga la reserva existente por ID, junto con las listas de clientes y paquetes para el formulario de edición.
- **Directorio de Feature (`apps/web/features/reservations/`)**:
  - `types/reservation.ts`: Define las interfaces TypeScript para el listado, creación y edición.
  - `schemas/reservationSchema.ts`: Validación de Zod.
  - `components/ReservationForm.tsx`: Formulario compartido que muestra selectores de clientes y paquetes, inputs de fecha de reserva, cantidad de personas, y el selector de estados.
  - `components/ReservationTable.tsx`: Tabla interactiva con campo de búsqueda por nombre de cliente o paquete, filtrando reactivamente en el cliente.

## Risks / Trade-offs

- **[Riesgo] Selección de Clientes o Paquetes en Grandes Volúmenes**: Un gran número de clientes o paquetes puede ralentizar el selector en el MVP.
  - *Mitigación*: Para el MVP, dado que es un proyecto académico de bajo volumen, se utilizará un componente selector simple (`Select` de shadcn/ui). Si la escala aumenta en el futuro, se migrará a un selector reactivo con autocompletado en el servidor.
