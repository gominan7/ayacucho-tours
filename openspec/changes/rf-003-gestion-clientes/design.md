## Context

Actualmente, no existe un módulo para gestionar la información de los clientes (viajeros). Para el MVP, tanto Administradores como Vendedores deben poder ver, buscar, registrar y editar clientes de manera ágil y segura. La base de datos debe almacenar y validar la unicidad del documento del cliente, y la eliminación de clientes debe ser puramente lógica  para evitar romper la integridad referencial en futuros módulos (como el de reservas y ventas).

## Goals / Non-Goals

**Goals:**
- Crear la estructura de base de datos para la tabla `clientes`.
- Diseñar la arquitectura frontend para listado, creación, edición, búsqueda y desactivación lógica de clientes en Next.js.
- Definir las Server Actions necesarias para interactuar con la base de datos de Supabase de manera segura.
- Asegurar que el documento de identidad sea único en la base de datos.
- Proteger las rutas `/clients/*` en el Middleware.

**Non-Goals:**
- Implementar la eliminación física de clientes.
- Crear credenciales de acceso o cuentas de Supabase Auth para los clientes.
- Permitir la importación masiva de clientes a través de archivos externos (CSV/Excel).

## Decisions

### 1. Modelo de Datos (`clientes`)
Crear una tabla llamada `clientes` en Supabase con los siguientes campos:
- `id` (UUID, Primary Key, auto-generado).
- `nombre_completo` (VARCHAR, no nulo).
- `tipo_documento` (VARCHAR, no nulo - DNI, Pasaporte, RUC, etc.).
- `nro_documento` (VARCHAR, no nulo, único).
- `email` (VARCHAR, opcional).
- `telefono` (VARCHAR, opcional).
- `created_at` (TIMESTAMP WITH TIME ZONE, no nulo).
- `updated_at` (TIMESTAMP WITH TIME ZONE, no nulo).


### 2. Estructura de Componentes y Páginas (Feature-Based Architecture)
- **Rutas**:
  - `apps/web/app/clients/page.tsx`: Listado de clientes con buscador.
  - `apps/web/app/clients/new/page.tsx`: Vista de registro de cliente.
  - `apps/web/app/clients/[id]/edit/page.tsx`: Vista de edición de cliente.
- **Feature Directory (`apps/web/features/clients/`)**:
  - `components/ClientTable.tsx`: Tabla interactiva con filtro de búsqueda por cliente y acciones.
  - `components/ClientForm.tsx`: Formulario compartido para registrar y editar clientes, integrado con `react-hook-form` y `zod`.
  - `actions/createClient.ts`: Server action para registrar un cliente.
  - `actions/updateClient.ts`: Server action para actualizar los datos.
  - `types/client.ts`: Interfaces de TypeScript.
  - `schemas/clientSchema.ts`: Definición de validación de campos con Zod.

### 3. Flujo de Navegación y UI
- Se actualizará el componente `Navbar.tsx` agregando el enlace a `/clients` visible tanto para Administradores como para Vendedores.
- El diseño y estilos visuales utilizarán las clases e inputs ya estructurados en el sistema de diseño (estilo Slate/Zinc).
## Risks / Trade-offs

- **[Riesgo] Documento Duplicado**: Si dos peticiones concurrentes intentan registrar el mismo número de documento al mismo tiempo, podría ocurrir una colisión antes de la validación a nivel de aplicación.
  - *Mitigación*: Se implementa un índice único (`UNIQUE`) en la tabla `clientes` a nivel de base de datos para rechazar peticiones concurrentes y capturar el error desde la Server Action, devolviendo un mensaje amigable al usuario.


