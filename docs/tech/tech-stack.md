# Tech Stack - AYACUCHO TOURS

## Información General

**Proyecto:** AYACUCHO TOURS

**Tipo de proyecto:** Sistema Web para la Gestión de una Agencia Turística

**Metodología:** Spec-Driven Development (OpenSpec)

**Arquitectura:** Full Stack con Next.js + Supabase

---

# Objetivo del Stack

El stack tecnológico ha sido seleccionado para desarrollar un MVP moderno, escalable y mantenible, aprovechando herramientas compatibles con IA y el flujo de trabajo de OpenSpec.

Todas las implementaciones deberán respetar este documento.

---

# Tecnologías Oficiales

| Categoría | Tecnología |
|-----------|------------|
| Framework | Next.js (App Router) |
| Lenguaje | TypeScript |
| Base de datos | PostgreSQL (Supabase) |
| Backend | Supabase |
| Autenticación | Supabase Auth |
| Almacenamiento | Supabase Storage |
| Estilos | Tailwind CSS |
| Componentes UI | shadcn/ui |
| Formularios | React Hook Form |
| Validación | Zod |
| Tablas | TanStack Table |
| Iconos | Lucide React |
| Dashboard | Recharts |
| Notificaciones | Sonner |
| Control de versiones | Git |
| Repositorio | GitHub |
| Despliegue | Vercel |

---

# Arquitectura

Se utilizará una arquitectura basada en funcionalidades (Feature-Based Architecture).

Cada módulo del sistema será independiente y contendrá únicamente el código relacionado con dicha funcionalidad.

Ejemplo:

src/features/auth

src/features/users

src/features/clients

src/features/reservations

src/features/payments

---

# Next.js

Se utilizará App Router.

Se priorizarán:

- Server Components
- Server Actions
- Route Handlers

Los Client Components únicamente se utilizarán cuando sean estrictamente necesarios.

---

# Base de Datos

La base de datos será PostgreSQL administrada por Supabase.

Toda la comunicación con la base de datos deberá realizarse mediante el cliente oficial de Supabase.

No se utilizará Prisma.

---

# Autenticación

La autenticación será administrada por Supabase Auth.

Características:

- Inicio de sesión mediante correo electrónico y contraseña.
- Gestión de sesiones.
- Recuperación de contraseña.
- Protección de rutas.
- Control de acceso basado en roles.

---

# Interfaz de Usuario

Se utilizarán componentes de shadcn/ui.

Toda la interfaz deberá cumplir los siguientes principios:

- Responsive.
- Mobile First.
- Accesible.
- Diseño limpio.
- Consistencia visual.

---

# Formularios

Todos los formularios utilizarán:

- React Hook Form
- Zod

No deberán existir validaciones duplicadas.

---

# Tablas

Todas las tablas utilizarán TanStack Table.

Deberán soportar cuando sea necesario:

- Ordenamiento.
- Búsqueda.
- Paginación.
- Filtros.

---

# Dashboard

Los gráficos utilizarán Recharts.

Todos los indicadores deberán obtener su información desde Supabase.

---

# Convenciones

## TypeScript

Siempre utilizar:

- Tipado estricto.
- Interfaces cuando representen entidades del dominio.
- Tipos cuando representen estructuras auxiliares.

No utilizar el tipo `any`, salvo casos excepcionales y debidamente justificados.

---

## Componentes

Los componentes deberán ser:

- Reutilizables.
- Pequeños.
- Con una única responsabilidad.

---

## Código

Se priorizará:

- Código limpio.
- Legibilidad.
- Simplicidad.
- Reutilización.

Evitar duplicación de lógica.

---

## Estado

Inicialmente no se utilizará una librería global de gestión de estado.

Se priorizará:

- Server Components.
- Server Actions.
- React Hooks.

Si en el futuro surge una necesidad real, se evaluará incorporar Zustand.

---

# Exclusiones

Este proyecto no utilizará:

- Prisma
- Redux
- Context API para lógica global
- CSS Modules
- Bootstrap
- Material UI

---

# Principios de Desarrollo

Todo el código generado deberá cumplir los siguientes principios:

- SOLID (cuando aplique)
- DRY
- KISS
- Clean Code
- Componentes reutilizables
- Separación de responsabilidades

---

# Compatibilidad con OpenSpec

Toda especificación (Proposal, Specs, Design y Tasks) deberá respetar este documento.

En caso de conflicto entre una especificación y este Tech Stack, prevalecerá este documento hasta que sea actualizado oficialmente.