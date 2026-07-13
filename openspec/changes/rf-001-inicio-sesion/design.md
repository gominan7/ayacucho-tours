## Context

El sistema AYACUCHO TOURS necesita implementar el control de acceso (RF-001). Actualmente, la raíz de la aplicación realiza una consulta de prueba a una tabla inexistente (`usuarios`) y no hay protección de rutas ni interfaz para el inicio de sesión. Esta propuesta establece el diseño técnico para la autenticación utilizando Supabase Auth y la sincronización con las tablas de seguridad locales (`User` y `Role`) cumpliendo con las reglas de negocio (BR-001, BR-002, BR-003, BR-026, BR-027, BR-028).

## Goals / Non-Goals

**Goals:**
- Implementar un flujo seguro de autenticación por correo electrónico y contraseña.
- Proteger las rutas privadas (`/dashboard` y subrutas de gestión) mediante middleware de Next.js.
- Encurtidores de sesión (Cerrar sesión) limpios y seguros.
- Validar el estado activo (`is_active`) del usuario antes de permitir la sesión (BR-003).
- Diseñar e implementar la estructura de tablas de seguridad (`Role` y `User`) en la base de datos de Supabase.

**Non-Goals:**
- Implementar flujo de recuperación de contraseña o registro público de usuarios (estos se gestionarán a través de panel de administración o directamente en base de datos en esta fase MVP).
- Configuración de proveedores OAuth (Google, Facebook, etc.).

## Decisions

### 1. Manejo de Sesión y Protección de Rutas (Middleware + Cookies)
- **Decisión:** Utilizar Supabase Auth para gestionar automáticamente la sesión del usuario y proteger las rutas mediante Middleware de Next.js.
- **Alternativa considerada:** Usar únicamente autenticación del lado del cliente (Client-side Router checks). Se descartó porque no previene el parpadeo de contenido (layout flash) y permite accesos no autorizados si JavaScript está deshabilitado o si se manipula el cliente.
- **Razón:** El uso de Middleware en Next.js App Router proporciona una barrera robusta y rápida en la capa Edge antes de renderizar cualquier Server Component.

### 2. Estructura de Tablas de Seguridad en Postgres
- **Decisión:** Crear tablas locales `Role` y `User` (en singular y PascalCase, según `database-design.md`). La clave primaria de `User` será un UUID que referenciará directamente a `auth.users(id)` en el esquema interno de Supabase Auth.
- **Alternativa considerada:** Guardar la información del rol directamente en `user_metadata` dentro de Supabase Auth. Se descartó porque limita la flexibilidad para realizar joins en PostgreSQL y no permite hacer cumplir la integridad referencial para otras entidades como `Reservation` o `Sale` asociadas a un usuario creador.
- **Razón:** Mantiene el modelo de datos limpio, normalizado y alineado con los estándares del proyecto (`database-design.md`).

### 3. Validación de Usuario Activo (`estado = 'Activo'`)
- **Decisión:** Tras iniciar sesión con Supabase Auth en la vista cliente, realizar una validación inmediata contra la tabla `usuarios`. Si el `estado` no es `'Activo'`, se cierra la sesión en el cliente inmediatamente (`supabase.auth.signOut()`) y se muestra un error al usuario.
- **Alternativa considerada:** Usar un Trigger de PostgreSQL que prevenga el login (en el hook de Supabase Auth). Se descartó por complejidad añadida para un MVP y por estar acoplado a la configuración interna de Supabase, dificultando el debug local.
- **Razón:** La validación en el flujo de autenticación cliente/servidor es simple, directa y genera un feedback de error inmediato y controlable para la UI.

---

## Modelos de Datos (SQL Migration)

```sql
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

-- Enable RLS
ALTER TABLE "roles" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "usuarios" ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Allow read for authenticated users" ON "roles"
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow read own user data" ON "usuarios"
    FOR SELECT TO authenticated USING (auth.uid() = id);
```

---

## Risks / Trade-offs
- **[Risk]** Latencia al validar el token JWT en cada petición en el Middleware → **Mitigación:** Usar `supabase.auth.getUser` que valida y obtiene el usuario mediante caché interna de sesión y solo realiza llamadas a la API de Supabase Auth cuando es necesario verificar la firma.
