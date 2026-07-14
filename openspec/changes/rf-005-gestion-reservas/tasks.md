## 1. Migraciones de Base de Datos

- [x] 1.1 Crear el archivo de migración `20260714000001_create_reservas_table.sql` en `supabase/migrations/` para definir la tabla `reservas`, incluyendo columnas `id`, `cliente_id`, `paquete_id`, `fecha_reserva`, `cantidad_personas`, `estado`, `created_at` y `updated_at`.
- [x] 1.2 Agregar restricciones de llave foránea (`FOREIGN KEY`) referenciando a `clientes` y `paquetes`, y la restricción `CHECK (cantidad_personas > 0)` y `CHECK (estado IN ('Pendiente', 'Confirmada', 'Cancelada'))`.

## 2. Tipos y Esquemas de Validación

- [x] 2.1 Crear el archivo `apps/web/features/reservations/types/reservation.ts` para definir las interfaces TypeScript de Reserva (`ReservationRow`), payload de creación y payload de actualización.
- [x] 2.2 Crear el archivo `apps/web/features/reservations/schemas/reservationSchema.ts` definiendo el esquema de validación de Zod para formularios de reservas de paquetes turísticos.

## 3. Server Actions

- [x] 3.1 Implementar la Server Action `createReservation` en `apps/web/features/reservations/actions/createReservation.ts` para registrar una nueva reserva tras validar los campos.
- [x] 3.2 Implementar la Server Action `updateReservation` en `apps/web/features/reservations/actions/updateReservation.ts` para modificar la información de una reserva existente.

## 4. Componentes de UI de Reservas

- [x] 4.1 Implementar `ReservationForm.tsx` en `apps/web/features/reservations/components/ReservationForm.tsx` usando `react-hook-form` e inputs para seleccionar cliente, paquete, fecha, pasajeros y estado.
- [x] 4.2 Implementar `ReservationTable.tsx` en `apps/web/features/reservations/components/ReservationTable.tsx` para mostrar la lista de reservas en formato de tabla, con campo de búsqueda reactivo y botones de acción (editar).

## 5. Vistas y Enlaces del Sistema

- [x] 5.1 Crear la ruta `/reservations` en `apps/web/app/reservations/page.tsx` para renderizar el listado y la búsqueda de reservas, consultando las relaciones de cliente y paquete.
- [x] 5.2 Crear la ruta `/reservations/new` en `apps/web/app/reservations/new/page.tsx` para cargar clientes/paquetes y mostrar el formulario de creación.
- [x] 5.3 Crear la ruta `/reservations/[id]/edit` en `apps/web/app/reservations/[id]/edit/page.tsx` para cargar datos de la reserva e interactuar con el formulario en modo edición.
- [x] 5.4 Actualizar el archivo `apps/web/components/Navbar.tsx` para hacer visible el enlace de "Reservas" tanto para administradores como para vendedores.
