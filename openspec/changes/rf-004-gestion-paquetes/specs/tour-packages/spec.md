## ADDED Requirements

### Requirement: Acceso Autorizado al Módulo de Paquetes Turísticos
El sistema SHALL permitir el acceso al listado, creación, edición y búsqueda de paquetes únicamente a los usuarios con rol de Administrador.

#### Scenario: Acceso permitido para Administrador
- **WHEN** un usuario con rol de Administrador intenta ingresar a `/tour-packages`
- **THEN** el sistema SHALL renderizar la página de gestión de paquetes turísticos correctamente.

#### Scenario: Acceso denegado para Vendedor
- **WHEN** un usuario con rol de Vendedor intenta acceder a `/tour-packages`
- **THEN** el sistema SHALL denegar el acceso y redireccionar al usuario a la página de `/dashboard`.

#### Scenario: Acceso denegado para usuarios no autenticados
- **WHEN** un usuario no autenticado intenta acceder a `/tour-packages`
- **THEN** el sistema SHALL denegar el acceso y redireccionar al usuario a la página de login o inicio de sesión.

### Requirement: Registro de Paquete Turístico con Nombre Único (BR-007, BR-009, BR-024, BR-029)
El sistema SHALL permitir al Administrador registrar un nuevo paquete turístico validando de forma obligatoria que el nombre ingresado sea único en el sistema y que el precio asignado sea mayor que cero.

#### Scenario: Registro exitoso de paquete turístico
- **WHEN** el Administrador completa todos los datos obligatorios del formulario (nombre, destino, precio y descripción opcional) con un nombre que no existe en el sistema, un precio mayor que cero y hace clic en "Guardar"
- **THEN** el sistema SHALL registrar el nuevo paquete turístico en la base de datos e indicar un mensaje de éxito.

#### Scenario: Fallo de registro por nombre de paquete duplicado
- **WHEN** el Administrador intenta registrar un paquete ingresando un nombre que ya está registrado para otro paquete en el sistema
- **THEN** el sistema SHALL rechazar la creación, no registrar el paquete y mostrar un mensaje de validación indicando que el nombre del paquete ya existe.

#### Scenario: Fallo de registro por precio menor o igual a cero
- **WHEN** el Administrador intenta registrar un paquete ingresando un precio menor o igual a cero
- **THEN** el sistema SHALL rechazar la creación, no registrar el paquete y mostrar un mensaje de validación indicando que el precio debe ser mayor a cero.

### Requirement: Edición de Datos de Paquete Turístico (BR-007, BR-009, BR-024)
El sistema SHALL permitir al Administrador editar la información de un paquete turístico existente manteniendo las validaciones de unicidad de nombre y precio mayor que cero.

#### Scenario: Edición exitosa de datos
- **WHEN** el Administrador modifica los campos (nombre, destino, precio o descripción) de un paquete con valores válidos y guarda los cambios
- **THEN**el sistema SHALL guardar la información actualizada del paquete turístico y mostrar un mensaje de éxito.

### Requirement: Listado y Búsqueda de Paquetes Turísticos
El sistema SHALL mostrar la lista de paquetes registrados en una tabla ordenada por fecha de creación (descendente), permitiendo filtrar dinámicamente los paquetes mediante un campo de búsqueda por nombre o destino.

#### Scenario: Búsqueda por nombre o destino
- **WHEN** el usuario ingresa un término de búsqueda (ej. nombre del paquete o destino) en la barra de búsqueda del listado
- **THEN** el sistema SHALL filtrar la lista en tiempo real para mostrar únicamente los paquetes cuyo nombre o destino coincida parcialmente con el valor ingresado.
