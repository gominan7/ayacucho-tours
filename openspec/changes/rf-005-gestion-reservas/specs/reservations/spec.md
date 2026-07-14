## ADDED Requirements

### Requirement: Acceso Autorizado al Módulo de Reservas
El acceso a la gestión de reservas de paquetes turísticos estará limitado a los usuarios autenticados con los roles de Administrador y Vendedor (BR-026, BR-027, BR-028).

#### Scenario: Acceso permitido para Administrador y Vendedor
- **WHEN** un usuario con rol de "Administrador" o "Vendedor" intenta acceder a la ruta `/reservations`
- **THEN** el sistema SHALL renderizar la página de listado de reservas.

#### Scenario: Acceso denegado para usuarios no autenticados
- **WHEN** un usuario no autenticado intenta acceder a la ruta `/reservations`
- **THEN** el sistema SHALL redirigir al usuario a la página de login.

---

### Requirement: Registro de Reserva de Paquete Turístico
El sistema SHALL permitir registrar una reserva asociando un cliente y un paquete turístico existentes, ingresando la fecha programada y la cantidad de personas (mayor que cero).

#### Scenario: Registro exitoso de reserva
- **WHEN** el usuario completa el formulario seleccionando un cliente existente, un paquete turístico existente, una fecha de viaje válida, una cantidad de personas mayor que 0 y hace clic en "Guardar"
- **THEN** el sistema SHALL registrar la reserva en la base de datos y mostrar un mensaje de éxito.

#### Scenario: Registro fallido por datos inválidos o incompletos
- **WHEN** el usuario intenta registrar una reserva dejando campos requeridos vacíos, o ingresando una cantidad de personas menor o igual a cero
- **THEN** el sistema SHALL rechazar la solicitud, mostrar mensajes de error específicos en el formulario y no persistir ningún dato.

---
### Requirement: Listado y Búsqueda de Reservas
El sistema debe listar las reservas en una tabla ordenada cronológicamente (creación descendente) y permitir la búsqueda reactiva en tiempo real por el nombre del cliente o el nombre del paquete turístico.

#### Scenario: Filtrado reactivo de reservas
- **WHEN** el usuario ingresa un fragmento de texto en el buscador de reservas
- **THEN** el sistema SHALL filtrar reactivamente y mostrar únicamente las reservas donde el nombre del cliente o el nombre del paquete turístico coincida parcialmente con el término ingresado.
