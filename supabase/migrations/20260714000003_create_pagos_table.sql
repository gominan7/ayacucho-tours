-- Create pagos table
CREATE TABLE IF NOT EXISTS "pagos" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    venta_id UUID NOT NULL REFERENCES ventas(id) ON DELETE CASCADE,
    fecha_pago DATE NOT NULL,
    monto_pagado DECIMAL(10, 2) NOT NULL CHECK (monto_pagado > 0),
    metodo_pago VARCHAR(50) NOT NULL CHECK (metodo_pago IN ('Efectivo', 'Transferencia', 'Tarjeta')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE "pagos" ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
CREATE POLICY "Allow select for Admin and Vendedor" ON "pagos"
    FOR SELECT TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM usuarios u
            JOIN roles r ON u.rol_id = r.id
            WHERE u.id = auth.uid() AND r.nombre IN ('Administrador', 'Vendedor')
        )
    );

CREATE POLICY "Allow insert for Admin and Vendedor" ON "pagos"
    FOR INSERT TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM usuarios u
            JOIN roles r ON u.rol_id = r.id
            WHERE u.id = auth.uid() AND r.nombre IN ('Administrador', 'Vendedor')
        )
    );

CREATE POLICY "Allow update for Admin and Vendedor" ON "pagos"
    FOR UPDATE TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM usuarios u
            JOIN roles r ON u.rol_id = r.id
            WHERE u.id = auth.uid() AND r.nombre IN ('Administrador', 'Vendedor')
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM usuarios u
            JOIN roles r ON u.rol_id = r.id
            WHERE u.id = auth.uid() AND r.nombre IN ('Administrador', 'Vendedor')
        )
    );

-- Create trigger for pagos table
CREATE TRIGGER update_pagos_updated_at
    BEFORE UPDATE ON "pagos"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
