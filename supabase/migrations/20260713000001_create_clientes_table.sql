-- Create clientes table
CREATE TABLE IF NOT EXISTS "clientes" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre_completo VARCHAR(255) NOT NULL,
    tipo_documento VARCHAR(50) NOT NULL,
    nro_documento VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255),
    telefono VARCHAR(50),
    is_active BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE "clientes" ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
CREATE POLICY "Allow select for Admin and Vendedor" ON "clientes"
    FOR SELECT TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM usuarios u
            JOIN roles r ON u.rol_id = r.id
            WHERE u.id = auth.uid() AND r.nombre IN ('Administrador', 'Vendedor')
        )
    );

CREATE POLICY "Allow insert for Admin and Vendedor" ON "clientes"
    FOR INSERT TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM usuarios u
            JOIN roles r ON u.rol_id = r.id
            WHERE u.id = auth.uid() AND r.nombre IN ('Administrador', 'Vendedor')
        )
    );

CREATE POLICY "Allow update for Admin and Vendedor" ON "clientes"
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

-- Create trigger function for updated_at if not exists
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for clientes table
CREATE TRIGGER update_clientes_updated_at
    BEFORE UPDATE ON "clientes"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
