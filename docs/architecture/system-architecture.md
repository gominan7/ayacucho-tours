# System Architecture - AYACUCHO TOURS

## Información General

**Proyecto:** AYACUCHO TOURS

**Versión:** 1.0

**Arquitectura:** Full Stack Web Application

---

# Objetivo

Definir la arquitectura oficial del sistema y las reglas que deberán seguir todas las implementaciones realizadas mediante OpenSpec.

Este documento es la referencia arquitectónica del proyecto.

---

# Visión General

AYACUCHO TOURS es una aplicación web Full Stack desarrollada con Next.js y Supabase.

La aplicación utiliza una arquitectura moderna basada en:

- Next.js App Router
- Server Components
- Server Actions
- PostgreSQL
- Supabase Auth
- Feature-Based Architecture

---

# Arquitectura General

```text
┌──────────────────────────────────────────────┐
│                  Cliente                     │
│                 (Navegador)                  │
└──────────────────────────────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────────────┐
│                  Next.js                     │
│                                              │
│  App Router                                 │
│  Server Components                          │
│  Client Components                          │
│  Server Actions                             │
│  Route Handlers                             │
└──────────────────────────────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────────────┐
│                 Supabase                     │
│                                              │
│ PostgreSQL                                  │
│ Authentication                              │
│ Storage                                     │
│ Row Level Security                          │
└──────────────────────────────────────────────┘
```

---

# Arquitectura por Capas

La aplicación estará organizada en las siguientes capas:

## Presentación

Responsable de mostrar la interfaz al usuario.

Ubicación:

src/app

src/components

---

## Dominio

Contiene la lógica específica de cada funcionalidad.

Ubicación:

src/features

---

## Servicios

Encapsula la comunicación con Supabase y otros servicios externos.

Ubicación:

src/services

---

## Librerías Compartidas

Funciones reutilizables.

Ubicación:

src/lib

---

## Tipos

Interfaces y tipos TypeScript compartidos.

Ubicación:

src/types

---

# Arquitectura por Funcionalidades

Cada módulo será independiente.

Ejemplo:

src/features/

auth/

users/

clients/

tour-packages/

reservations/

sales/

payments/

dashboard/

Cada feature podrá contener:

- components
- hooks
- actions
- services
- schemas
- types
- utils

siempre que sea necesario.

---

# Flujo de Datos

La información seguirá el siguiente flujo:

Usuario

↓

Interfaz

↓

Server Action

↓

Supabase

↓

PostgreSQL

↓

Respuesta

↓

Interfaz

---

# Componentes

Se utilizarán dos tipos de componentes.

## Server Components

Serán la opción por defecto.

Responsables de:

- Obtener información.
- Renderizar vistas.
- Ejecutar consultas.

---

## Client Components

Solo cuando sea necesario.

Ejemplos:

- Formularios.
- Componentes interactivos.
- Modales.
- Tablas con filtros.

---

# Acceso a Datos

Toda comunicación con la base de datos deberá realizarse mediante el cliente oficial de Supabase.

No se permitirá acceder directamente a PostgreSQL.

---

# Autenticación

Toda autenticación será administrada por Supabase Auth.

El sistema utilizará:

- Sesiones.
- Roles.
- Middleware de protección.
- Control de acceso por permisos.

---

# Gestión del Estado

Se priorizará:

- Server Components.
- Server Actions.
- Estado local mediante React.

No se utilizará un gestor global de estado salvo que exista una necesidad claramente justificada.

---

# Manejo de Errores

Toda operación deberá:

- Validar entradas.
- Manejar excepciones.
- Mostrar mensajes amigables.
- Registrar errores cuando corresponda.

---

# Convenciones Arquitectónicas

Todas las implementaciones deberán respetar:

- Responsabilidad única.
- Separación de responsabilidades.
- Componentes reutilizables.
- Código desacoplado.
- Bajo acoplamiento.
- Alta cohesión.

---

# Principios

Toda implementación deberá seguir:

- SOLID
- DRY
- KISS
- Clean Code

---

# Escalabilidad

La arquitectura deberá permitir agregar nuevos módulos sin modificar significativamente los existentes.

---

# Seguridad

La seguridad deberá implementarse en múltiples niveles:

- Autenticación.
- Autorización.
- Validación.
- Protección de rutas.
- Row Level Security.
- Variables de entorno.

---

# Integración con OpenSpec

Toda implementación generada mediante OpenSpec deberá respetar esta arquitectura.

No se permitirá crear estructuras diferentes sin una modificación previa de este documento.

En caso de conflicto entre una especificación y este documento, prevalecerá la arquitectura aquí definida hasta que sea oficialmente actualizada.