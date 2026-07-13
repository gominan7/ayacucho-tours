# Database Design - AYACUCHO TOURS

## Información General

**Proyecto:** AYACUCHO TOURS

**Versión:** 1.0

**Motor de Base de Datos:** PostgreSQL (Supabase)

---

# Objetivo

Definir el diseño lógico de la base de datos del sistema.

Este documento describe las entidades principales, sus relaciones y las reglas de integridad que deberán respetarse durante el desarrollo.

---

# Principios de Diseño

La base de datos deberá cumplir los siguientes principios:

- Normalización (hasta donde sea conveniente para el MVP).
- Integridad referencial.
- Consistencia de datos.
- Escalabilidad.
- Facilidad de mantenimiento.
- Auditoría básica.

---

# Entidades Principales

El sistema estará compuesto por las siguientes entidades:

## Seguridad

- Role
- User

---

## Gestión de Clientes

- Client

---

## Gestión de Paquetes Turísticos

- Destination
- TourPackage

---

## Gestión Comercial

- Reservation
- Sale
- Payment

---

# Relaciones

## Role

Un rol puede pertenecer a muchos usuarios.

Role

↓

User

(1:N)

---

## Client

Un cliente puede tener múltiples reservas.

Client

↓

Reservation

(1:N)

---

## Destination

Un destino puede pertenecer a múltiples paquetes turísticos.

Destination

↓

TourPackage

(1:N)

---

## TourPackage

Un paquete turístico puede estar asociado a múltiples reservas.

TourPackage

↓

Reservation

(1:N)

---

## Reservation

Cada reserva genera como máximo una venta.

Reservation

↓

Sale

(1:1)

---

## Sale

Una venta puede registrar múltiples pagos.

Sale

↓

Payment

(1:N)

---

# Entidades Base

Todas las entidades principales deberán incluir como mínimo:

- id
- created_at
- updated_at

Cuando corresponda:

- created_by
- updated_by
- is_active

---

# Claves Primarias

Todas las tablas utilizarán UUID como clave primaria.

Ejemplo:

id UUID PRIMARY KEY

---

# Claves Foráneas

Las relaciones deberán implementarse mediante Foreign Keys.

No se permitirá mantener relaciones únicamente mediante lógica de aplicación.

---

# Restricciones

La base de datos deberá utilizar restricciones para garantizar la integridad.

Ejemplos:

- UNIQUE
- NOT NULL
- FOREIGN KEY
- CHECK

Siempre que sea posible, las reglas deberán implementarse tanto en la base de datos como en la aplicación.

---

# Eliminación de Registros

Se priorizará la eliminación lógica.

Cuando una entidad deba eliminarse:

- se marcará como inactiva

o

- se registrará una fecha de eliminación

según corresponda.

La eliminación física únicamente se utilizará cuando sea estrictamente necesaria.

---

# Auditoría

Todas las entidades deberán registrar:

- Fecha de creación
- Fecha de actualización

En futuras versiones podrán incorporarse:

- Usuario creador
- Usuario modificador
- Historial de cambios

---

# Índices

Se crearán índices para optimizar consultas frecuentes.

Ejemplos:

- correo electrónico
- documento de identidad
- estado
- fechas
- claves foráneas

Los índices deberán justificarse por su impacto en el rendimiento.

---

# Convenciones de Nombres

## Tablas

- Singular.
- PascalCase.

Ejemplos:

- User
- Client
- Reservation

---

## Columnas

snake_case

Ejemplos:

created_at

updated_at

first_name

last_name

---

## Claves Foráneas

Nombre de la entidad seguido de "_id"

Ejemplo:

client_id

reservation_id

tour_package_id

---

# Seguridad

El acceso a la información será administrado mediante:

- Supabase Auth
- Row Level Security (RLS)

Toda tabla deberá evaluar la necesidad de políticas RLS antes de ser utilizada en producción.

---

# Migraciones

Toda modificación de la estructura deberá realizarse mediante migraciones versionadas.

No se permitirá modificar manualmente la estructura de producción.

---

# Compatibilidad con OpenSpec

Toda implementación relacionada con la base de datos deberá respetar este documento.

Las especificaciones (Proposal, Specs, Design y Tasks) deberán utilizar estas entidades como referencia oficial.

---

# Evolución

Este documento representa el diseño lógico del sistema.

Los diagramas entidad-relación, scripts SQL y migraciones se mantendrán sincronizados con esta especificación conforme evolucione el proyecto.