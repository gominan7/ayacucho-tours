# Project Glossary - AYACUCHO TOURS

## Información General

**Proyecto:** AYACUCHO TOURS

**Versión:** 1.0

**Propósito:** Definir la terminología oficial del proyecto para garantizar consistencia en la documentación, especificaciones y código generado mediante OpenSpec.

---

# Introducción

Este glosario establece el significado oficial de los términos utilizados dentro del proyecto.

Toda la documentación, especificaciones y código deberán utilizar estas definiciones.

---

# Agencia Turística

Empresa dedicada a la comercialización de paquetes turísticos y servicios relacionados con el turismo.

En este proyecto representa la organización que utiliza el sistema.

---

# Usuario

Persona autorizada para acceder al sistema mediante autenticación.

Un usuario pertenece a un rol y utiliza el sistema para realizar operaciones administrativas o comerciales.

Ejemplos:

- Administrador
- Vendedor

---

# Rol

Conjunto de permisos asignados a un usuario.

Determina las funcionalidades que el usuario puede utilizar dentro del sistema.

---

# Cliente

Persona que adquiere uno o más paquetes turísticos ofrecidos por la agencia.

Un cliente puede realizar múltiples reservas.

No debe confundirse con un usuario del sistema.

---

# Destino

Lugar turístico incluido dentro de uno o varios paquetes turísticos.

Ejemplos:

- Huamanga
- Vilcashuamán
- Pampa de Ayacucho

---

# Paquete Turístico

Conjunto de servicios turísticos ofrecidos por la agencia.

Puede incluir:

- Destinos
- Transporte
- Hospedaje
- Alimentación
- Guía turístico

Un paquete puede ser reservado por múltiples clientes.

---

# Reserva

Registro que representa la intención de un cliente de contratar un paquete turístico.

Toda reserva pertenece a un cliente y a un paquete turístico.

Una reserva podrá encontrarse en alguno de los siguientes estados:

- Pendiente
- Confirmada
- Cancelada

---

# Venta

Confirmación comercial derivada de una reserva.

Representa el compromiso económico entre la agencia y el cliente.

Una reserva genera como máximo una venta.

---

# Pago

Registro económico asociado a una venta.

Una venta puede recibir uno o varios pagos hasta completar el monto total.

---

# Dashboard

Pantalla que muestra indicadores relevantes del negocio mediante tarjetas, gráficos y estadísticas.

Su propósito es apoyar la toma de decisiones.

---

# Reporte

Consulta estructurada que presenta información del sistema para análisis o control administrativo.

---

# Estado

Valor que representa la situación actual de una entidad.

Ejemplos:

- Activo
- Inactivo
- Pendiente
- Confirmado
- Cancelado

---

# Autenticación

Proceso mediante el cual un usuario demuestra su identidad para acceder al sistema.

En este proyecto será administrada por Supabase Auth.

---

# Autorización

Proceso que determina las acciones que un usuario autenticado puede realizar según su rol.

---

# MVP (Minimum Viable Product)

Primera versión funcional del sistema que incluye únicamente las funcionalidades esenciales para satisfacer las necesidades del negocio.

---

# OpenSpec Change

Unidad de trabajo utilizada por OpenSpec.

Cada Change representa una única funcionalidad o modificación del sistema.

Todo desarrollo deberá originarse a partir de un Change.

---

# Feature

Módulo funcional del sistema.

Ejemplos:

- Auth
- Users
- Clients
- Reservations
- Payments

Cada Feature agrupa el código relacionado con una única responsabilidad.

---

# Server Action

Función del servidor utilizada por Next.js para ejecutar lógica de negocio sin necesidad de crear una API tradicional.

---

# Server Component

Componente renderizado en el servidor.

Será el tipo de componente utilizado por defecto en este proyecto.

---

# Client Component

Componente renderizado en el navegador.

Solo deberá utilizarse cuando exista interacción directa con el usuario.

---

# Supabase

Plataforma Backend utilizada por el proyecto.

Proporciona:

- PostgreSQL
- Authentication
- Storage
- Row Level Security

---

# Definiciones Oficiales

En caso de conflicto entre documentos, las definiciones establecidas en este glosario tendrán prioridad para la interpretación del dominio del negocio.