## Context

Este diseño detalla la implementación del módulo de Gestión de Pagos (RF-007) para el sistema AYACUCHO TOURS. El sistema actualmente permite gestionar clientes, paquetes, reservas y ventas, pero requiere un módulo para registrar y consultar los pagos correspondientes a cada venta.

## Goals / Non-Goals

**Goals:**
- Implementar la tabla `pagos` en PostgreSQL (Supabase).
- Implementar Server Actions para la creación, actualización y listado de pagos con validación por Zod.
- Crear la interfaz de usuario para listar, registrar, editar y buscar pagos.
- Validar accesos según rol de usuario.

**Non-Goals:**
- Integrar pasarelas de pago reales (Stripe, PayPal, etc.).
- Procesamiento de cobros electrónicos reales.
- Generación y descarga de facturas o comprobantes fiscales.
- Envío de notificaciones automáticas tras el pago.

## Decisions

### 1. Diseño de Base de Datos (Tabla `pagos`)
Se creará la tabla `pagos` en PostgreSQL vía migración con la siguiente estructura:
- `id` (UUID, PK, default: `gen_random_uuid()`)
- `venta_id` (UUID, FK a `ventas.id`, ON DELETE CASCADE)
- `fecha_pago` (DATE, NOT NULL)
- `monto_pagado` (DECIMAL(10, 2), NOT NULL, CHECK > 0)
- `metodo_pago` (VARCHAR(50), NOT NULL, CHECK: 'Efectivo', 'Transferencia', 'Tarjeta')
- `created_at` y `updated_at` (TIMESTAMP WITH TIME ZONE, NOT NULL)

### 2. Estructura de Carpetas de la Característica
Se seguirá la arquitectura basada en características (Feature-Based Architecture):
- `apps/web/features/payments/`
  - `actions/`: `createPayment.ts`, `updatePayment.ts`, `getPayments.ts`
  - `components/`: `PaymentTable.tsx`, `PaymentForm.tsx`
  - `schemas/`: `paymentSchema.ts`
  - `types/`: `payment.ts`

Las páginas de la aplicación se ubicarán en `apps/web/app/payments/` (rutas para listado, creación y edición).

