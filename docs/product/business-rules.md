# Business Rules - AYACUCHO TOURS

## Información General

**Proyecto:** AYACUCHO TOURS

**Versión:** 1.0

**Propósito:** Definir las reglas de negocio que rigen el funcionamiento del sistema.

---

# Introducción

Las reglas de negocio establecen las restricciones, políticas y condiciones que deben cumplirse durante la operación del sistema.

Estas reglas deberán ser respetadas por todas las especificaciones (Proposal, Specs, Design y Tasks) y por toda implementación realizada mediante OpenSpec.

---

# Roles del Sistema

El sistema manejará los siguientes roles:

## Administrador

Tiene acceso completo al sistema.

Puede:

- Administrar usuarios.
- Administrar clientes.
- Administrar paquetes turísticos.
- Gestionar reservas.
- Registrar ventas.
- Registrar pagos.
- Visualizar dashboard.
- Consultar reportes.

---

## Vendedor

Puede:

- Gestionar clientes.
- Registrar reservas.
- Registrar ventas.
- Registrar pagos.

No podrá administrar usuarios del sistema.

---

# Usuarios

BR-001

Cada usuario deberá tener un correo electrónico único.

---

BR-002

Todo usuario deberá pertenecer a un rol.

---

BR-003

Los usuarios inactivos no podrán iniciar sesión.

---

# Clientes

BR-004

Cada cliente deberá registrarse una sola vez.

---

BR-005

El documento de identidad deberá ser único.

---

BR-006

Un cliente podrá realizar múltiples reservas.

---

# Paquetes Turísticos

BR-007

Todo paquete turístico deberá tener un estado:

- Activo
- Inactivo

---

BR-008

Solo los paquetes activos podrán ser reservados.

---

BR-009

Todo paquete deberá tener un precio mayor que cero.

---

# Reservas

BR-010

Toda reserva deberá estar asociada a un cliente.

---

BR-011

Toda reserva deberá estar asociada a un paquete turístico.

---

BR-012

Toda reserva deberá registrar la fecha de creación.

---

BR-013

Una reserva tendrá uno de los siguientes estados:

- Pendiente
- Confirmada
- Cancelada

---

BR-014

Una reserva cancelada no podrá convertirse nuevamente en pendiente.

---

# Ventas

BR-015

Toda venta deberá estar asociada a una reserva.

---

BR-016

No podrá registrarse más de una venta para la misma reserva.

---

BR-017

Toda venta deberá registrar el monto total.

---

# Pagos

BR-018

Todo pago deberá estar asociado a una venta.

---

BR-019

El monto del pago deberá ser mayor que cero.

---

BR-020

El total pagado no podrá superar el monto total de la venta.

---

BR-021

Una venta podrá tener uno o varios pagos.

---

# Dashboard

BR-022

Los indicadores deberán calcularse utilizando información almacenada en la base de datos.

No se permitirá registrar información manualmente.

---

# Reportes

BR-023

Los reportes deberán generarse utilizando información actualizada.

---

# Auditoría

BR-024

Toda entidad principal deberá registrar:

- Fecha de creación.
- Fecha de actualización.

---

BR-025

Los registros eliminados no deberán perder la trazabilidad.

Siempre que sea posible se utilizará eliminación lógica.

---

# Seguridad

BR-026

El acceso a cada módulo dependerá del rol del usuario autenticado.

---

BR-027

Ningún usuario podrá acceder a funcionalidades para las cuales no tenga permisos.

---

BR-028

Toda sesión deberá pertenecer a un usuario autenticado mediante Supabase Auth.

---

# Integridad

BR-029

No se permitirá información duplicada cuando exista una restricción de unicidad.

---

BR-030

Las relaciones entre entidades deberán mantenerse íntegras mediante claves foráneas y validaciones de negocio.

---

# Principios Generales

Todo el sistema deberá cumplir los siguientes principios:

- Integridad de la información.
- Trazabilidad.
- Seguridad.
- Consistencia.
- Simplicidad.
- Escalabilidad.
- Mantenibilidad.

---

# Modificación de Reglas

Toda modificación a estas reglas deberá realizarse mediante un Change de OpenSpec.

Ninguna implementación podrá contradecir las reglas aquí definidas.
