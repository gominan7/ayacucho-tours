## 1. Base de Datos

- [x] 1.1 Crear el archivo de migración SQL para la tabla `pagos` con referencias a la tabla `ventas`.
- [x] 1.2 Habilitar Row Level Security (RLS) en la tabla `pagos` y añadir las políticas para Administrador y Vendedor.

## 2. Tipos y Esquemas de Validación

- [x] 2.1 Definir los tipos de TypeScript para pagos en `apps/web/features/payments/types/payment.ts`.
- [x] 2.2 Implementar el esquema de validación Zod en `apps/web/features/payments/schemas/paymentSchema.ts`.

## 3. Server Actions

- [x] 3.1 Implementar Server Action para obtener el listado de pagos (`getPayments.ts`) incluyendo información de cliente y venta asociada.
- [x] 3.2 Implementar Server Action para obtener ventas disponibles con su monto total y saldo cobrado (`getSalesForSelection.ts`).
- [x] 3.3 Implementar Server Action para registrar pagos (`createPayment.ts`) validando que el monto sea mayor a cero (BR-019).
- [x] 3.4 Implementar Server Action para actualizar pagos (`updatePayment.ts`) validando que el monto sea mayor a cero (BR-019).

## 4. Componentes de Interfaz de Usuario (UI)

- [x] 4.1 Crear el componente `PaymentTable.tsx` para listar, buscar y filtrar los pagos por cliente o ID/número de venta.
- [x] 4.2 Crear el componente `PaymentForm.tsx` que permita registrar y editar pagos.

## 5. Páginas del Sistema y Navegación

- [x] 5.1 Crear la página principal de pagos en `apps/web/app/payments/page.tsx`.
- [x] 5.2 Crear la página para nuevo pago en `apps/web/app/payments/new/page.tsx`.
- [x] 5.3 Crear la página de edición de pago en `apps/web/app/payments/[id]/edit/page.tsx`.
- [x] 5.4 Actualizar el componente `Navbar.tsx` para añadir el enlace al módulo de pagos para Administradores y Vendedores.
