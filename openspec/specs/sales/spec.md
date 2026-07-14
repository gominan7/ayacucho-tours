# sales Specification

## Purpose
TBD - created by archiving change rf-006-gestion-ventas. Update Purpose after archive.
## Requirements
### Requirement: Acceso Autorizado al Módulo de Ventas
El sistema SHALL permitir el acceso a la gestión de ventas únicamente a los usuarios autenticados con los roles de Administrador y Vendedor.

#### Scenario: Acceso permitido para Administrador y Vendedor
- **WHEN** un usuario con rol de "Administrador" o "Vendedor" intenta acceder a la ruta `/sales`
- **THEN** el sistema SHALL permitir el ingreso y mostrar la interfaz de gestión de ventas.

#### Scenario: Acceso denegado para otros roles
- **WHEN** un usuario no autenticado o con rol distinto de "Administrador" o "Vendedor" intenta acceder a la ruta `/sales`
- **THEN** el sistema SHALL bloquear el acceso y redireccionar al usuario a la página de inicio de sesión.

---

### Requirement: Registro de Venta desde Reserva
El sistema SHALL permitir registrar una venta asociándola a una reserva existente, seleccionando la fecha de venta, el monto total (mayor que cero) y el método de pago (Efectivo, Transferencia, Tarjeta).

#### Scenario: Registro exitoso de venta
- **WHEN** el usuario completa el formulario seleccionando una reserva existente, una fecha de venta válida, un monto total mayor que cero, un método de pago válido y hace clic en "Guardar"
- **THEN** el sistema SHALL registrar la venta en la base de datos y mostrar un mensaje de éxito.

#### Scenario: Registro fallido por datos inválidos o incompletos
- **WHEN** el usuario intenta registrar una venta dejando campos requeridos vacíos, o ingresando un monto total menor o igual a cero
- **THEN** el sistema SHALL rechazar el registro y mostrar los correspondientes mensajes de error de validación en la interfaz.

---

### Requirement: Edición de Venta
El sistema SHALL permitir actualizar los datos de una venta existente, incluyendo la fecha de venta, el monto total y el método de pago.

#### Scenario: Edición exitosa de venta
- **WHEN** el usuario edita una venta activa, modifica algún campo válido y hace clic en "Guardar"
- **THEN** el sistema SHALL guardar la información actualizada y mostrar un mensaje de éxito.

---

### Requirement: Listado y Búsqueda de Ventas
El sistema SHALL listar las ventas y permitir la búsqueda por nombre del cliente o ID/número de venta.

#### Scenario: Filtrado de ventas
- **WHEN** el usuario ingresa un fragmento de texto en el buscador de ventas
- **THEN** el sistema SHALL filtrar y mostrar únicamente las ventas donde el nombre del cliente o el ID de venta coincida parcialmente con el término ingresado.

