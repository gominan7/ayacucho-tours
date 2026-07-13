-- Create roles table
CREATE TABLE IF NOT EXISTS "roles" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create usuarios table
CREATE TABLE IF NOT EXISTS "usuarios" (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    rol_id UUID NOT NULL REFERENCES "roles"(id) ON DELETE RESTRICT,
    estado VARCHAR(50) DEFAULT 'Activo' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Insert initial roles
INSERT INTO "roles" (nombre) VALUES ('Administrador') ON CONFLICT (nombre) DO NOTHING;
INSERT INTO "roles" (nombre) VALUES ('Vendedor') ON CONFLICT (nombre) DO NOTHING;

-- Enable Row Level Security (RLS)
ALTER TABLE "roles" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "usuarios" ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Allow read for authenticated users" ON "roles"
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow read own user data" ON "usuarios"
    FOR SELECT TO authenticated USING (auth.uid() = id);

-- =========================================================================
-- INSTRUCCIONES PARA CREAR UN USUARIO DE PRUEBA:
-- =========================================================================
-- 1. Crea el usuario en el panel de Supabase Auth (Authentication -> Users -> Add User).
-- 2. Copia el UUID generado para ese usuario.
-- 3. Reemplaza 'INSERT_USER_UUID_HERE' con el UUID copiado y ejecuta el siguiente script:
--
-- INSERT INTO "usuarios" (id, email, rol_id, estado)
-- VALUES (
--   'INSERT_USER_UUID_HERE',
--   'admin@ayacuchotours.com',
--   (SELECT id FROM roles WHERE nombre = 'Administrador' LIMIT 1),
--   'Activo'
-- );
-- =========================================================================

