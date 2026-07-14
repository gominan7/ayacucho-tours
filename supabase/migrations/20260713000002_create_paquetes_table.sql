-- Create paquetes table
CREATE TABLE IF NOT EXISTS "paquetes" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(255) NOT NULL UNIQUE,
    destino VARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio NUMERIC(10, 2) NOT NULL CHECK (precio > 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE "paquetes" ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
CREATE POLICY "Allow select for Admin and Vendedor" ON "paquetes"
    FOR SELECT TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM usuarios u
            JOIN roles r ON u.rol_id = r.id
            WHERE u.id = auth.uid() AND r.nombre IN ('Administrador', 'Vendedor')
        )
    );

CREATE POLICY "Allow insert for Admin" ON "paquetes"
    FOR INSERT TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM usuarios u
            JOIN roles r ON u.rol_id = r.id
            WHERE u.id = auth.uid() AND r.nombre = 'Administrador'
        )
    );

CREATE POLICY "Allow update for Admin" ON "paquetes"
    FOR UPDATE TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM usuarios u
            JOIN roles r ON u.rol_id = r.id
            WHERE u.id = auth.uid() AND r.nombre = 'Administrador'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM usuarios u
            JOIN roles r ON u.rol_id = r.id
            WHERE u.id = auth.uid() AND r.nombre = 'Administrador'
        )
    );

-- Create trigger for packages table
CREATE TRIGGER update_paquetes_updated_at
    BEFORE UPDATE ON "paquetes"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
