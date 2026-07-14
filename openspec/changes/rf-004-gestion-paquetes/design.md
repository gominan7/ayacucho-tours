## Context

El módulo de Gestión de Paquetes Turísticos (RF-004) permitirá administrar el catálogo de viajes y actividades que ofrece la agencia. Los administradores deben poder crear, editar, buscar y listar paquetes turísticos.

## Goals / Non-Goals

**Goals:**
- Crear la estructura de base de datos para la tabla `paquetes`.
- Diseñar la arquitectura frontend para listado, creación, edición y búsqueda de paquetes en Next.js.
- Definir las Server Actions necesarias para interactuar con la base de datos de Supabase de manera segura.
- Garantizar que el nombre del paquete turístico sea único.
- Asegurar que el precio de los paquetes sea estrictamente mayor que cero.
- Proteger las rutas `/tour-packages/*` en el Middleware para que solo los Administradores tengan acceso.

**Non-Goals:**
- Implementar la eliminación física de paquetes turísticos.
- Crear una interfaz CRUD separada para destinos (`Destination`). Para el MVP, el destino será guardado directamente como una cadena de texto en cada paquete.
- Permitir la subida de múltiples fotos o galerías de imágenes para los paquetes turísticos.

## Decisions

### 1. Modelo de Datos (`paquetes`)
Crear una tabla llamada `paquetes` en Supabase con los siguientes campos:
- `id` (UUID, Primary Key, auto-generado).
- `nombre` (VARCHAR, no nulo, único).
- `destino` (VARCHAR, no nulo).
- `descripcion` (TEXT, opcional).
- `precio` (NUMERIC(10,2), no nulo, con restricción `CHECK (precio > 0)`).
- `created_at` (TIMESTAMP WITH TIME ZONE, no nulo).
- `updated_at` (TIMESTAMP WITH TIME ZONE, no nulo).

*Razón:* Almacenar el destino directamente en el paquete simplifica el modelo físico de la base de datos y reduce la sobrecarga de mantenimiento de múltiples tablas para el MVP, cumpliendo plenamente con la regla de no agregar alcance extra.

### 2. Estructura de Componentes y Páginas (Feature-Based Architecture)
- **Rutas (`apps/web/app/tour-packages/`)**:
  - `page.tsx`: Listado de paquetes turísticos con buscador reactivo.
  - `new/page.tsx`: Vista de registro de nuevo paquete turístico.
  - `[id]/edit/page.tsx`: Vista de edición de paquete turístico.
- **Directorio de Feature (`apps/web/features/tour-packages/`)**:
  - `components/PackageTable.tsx`: Tabla interactiva con filtro de búsqueda reactivo y menú de acciones (editar).
  - `components/PackageForm.tsx`: Formulario compartido para registrar y editar paquetes turísticos, integrado con `react-hook-form` y `zod`.
  - `actions/createPackage.ts`: Server action para registrar un paquete turístico.
  - `actions/updatePackage.ts`: Server action para actualizar los datos.
  - `types/package.ts`: Interfaces de TypeScript.
  - `schemas/packageSchema.ts`: Definición de validación de campos con Zod.

## Risks / Trade-offs

- **[Riesgo] Nombre de Paquete Duplicado**: Intentos concurrentes de registrar el mismo nombre de paquete.
  - *Mitigación*: Se implementa un índice único (`UNIQUE`) en la tabla `paquetes` a nivel de base de datos para rechazar peticiones concurrentes y capturar el error desde la Server Action, devolviendo un mensaje amigable al usuario.
