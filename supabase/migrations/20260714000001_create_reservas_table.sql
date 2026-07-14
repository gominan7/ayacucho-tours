-- Create reservas table
CREATE TABLE IF NOT EXISTS "reservas" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cliente_id UUID NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
    paquete_id UUID NOT NULL REFERENCES paquetes(id) ON DELETE CASCADE,
    fecha_reserva DATE NOT NULL,
    cantidad_personas INTEGER NOT NULL CHECK (cantidad_personas > 0),
    estado VARCHAR(50) NOT NULL DEFAULT 'Pendiente' CHECK (estado IN ('Pendiente', 'Confirmada', 'Cancelada')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);
