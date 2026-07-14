## ADDED Requirements

### Requirement: Acceso Autorizado al Módulo de Pagos
El sistema SHALL permitir el acceso a la gestión de pagos únicamente a los usuarios autenticados con los roles de Administrador y Vendedor.

#### Scenario: Acceso permitido para Administrador y Vendedor
- **WHEN** un usuario con rol de "Administrador" o "Vendedor" intenta acceder a la ruta `/payments`
- **THEN** el sistema SHALL permitir el ingreso y mostrar la interfaz de gestión de pagos.

#### Scenario: Acceso denegado para otros roles o usuarios no autenticados
- **WHEN** un usuario no autenticado o con rol distinto de "Administrador" o "Vendedor" intenta acceder a la ruta `/payments`
- **THEN** el sistema SHALL bloquear el acceso y redireccionar al usuario a la página de inicio de sesión.

---

### Requirement: Listado y Búsqueda de Pagos
El sistema SHALL listar los pagos registrados y permitir realizar búsquedas avanzadas por el nombre del cliente o por el ID/número de venta.

#### Scenario: Listado exitoso de pagos
- **WHEN** un usuario autorizado accede al módulo `/payments`
- **THEN** el sistema SHALL listar todos los pagos registrados ordenados por fecha de creación, mostrando la información del cliente, el ID de venta, la fecha del pago, el monto pagado y el método de pago.

#### Scenario: Búsqueda y filtrado de pagos
- **WHEN** el usuario ingresa un término de búsqueda (nombre de cliente o ID de venta) en el buscador de la interfaz de pagos
- **THEN** el sistema SHALL actualizar la lista mostrando únicamente los registros que coincidan parcialmente con el término ingresado.

---

### Requirement: Registro de Pago
El sistema SHALL permitir registrar un pago asociándolo a una venta existente, ingresando la fecha de pago, el monto pagado y el método de pago (Efectivo, Transferencia, Tarjeta).

#### Scenario: Registro exitoso de pago
- **WHEN** el usuario completa el formulario seleccionando una venta existente, ingresando una fecha de pago válida, un monto mayor que cero y un método de pago válido, y hace clic en "Guardar"
- **THEN** el sistema SHALL registrar el pago en la base de datos y mostrar un mensaje de éxito.

#### Scenario: Registro fallido por datos inválidos o vacíos
- **WHEN** el usuario intenta registrar un pago dejando campos requeridos vacíos, o ingresando un monto menor o igual a cero
- **THEN** el sistema SHALL rechazar la creación del registro y mostrar mensajes de error de validación en la interfaz.

---

### Requirement: Edición de Pago
El sistema SHALL permitir editar los datos de un pago existente.

#### Scenario: Edición exitosa de pago
- **WHEN** el usuario edita un pago y guarda los cambios
- **THEN** el sistema SHALL actualizar la información del pago y mostrar un mensaje de éxito.

