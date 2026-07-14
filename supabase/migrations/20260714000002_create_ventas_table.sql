-- Create ventas table
CREATE TABLE IF NOT EXISTS "ventas" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reserva_id UUID NOT NULL REFERENCES reservas(id) ON DELETE CASCADE,
    fecha_venta DATE NOT NULL,
    monto_total DECIMAL(10, 2) NOT NULL CHECK (monto_total > 0),
    metodo_pago VARCHAR(50) NOT NULL CHECK (metodo_pago IN ('Efectivo', 'Transferencia', 'Tarjeta')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);
