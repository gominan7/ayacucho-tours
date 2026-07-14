## ADDED Requirements

### Requirement: Acceso Autorizado al Módulo de Clientes
El sistema SHALL permitir el acceso al listado, creación, edición y búsqueda de clientes únicamente a los usuarios con rol de Administrador o Vendedor.

#### Scenario: Acceso permitido para Administrador y Vendedor
- **WHEN** un usuario con rol de Administrador o Vendedor intenta ingresar a `/clients`
- **THEN** el sistema SHALL renderizar la página de listado de clientes correctamente.

#### Scenario: Acceso denegado para usuarios no autenticados
- **WHEN** un usuario no autenticado intenta acceder a `/clients`
- **THEN** el sistema SHALL denegar el acceso y redireccionar al usuario a la página de login o inicio de sesión.

### Requirement: Listado y Búsqueda de Clientes
El sistema SHALL mostrar la lista de clientes registrados en una tabla ordenada por fecha de creación (descendente), permitiendo filtrar dinámicamente los clientes mediante un campo de búsqueda por nombre o número de documento.

#### Scenario: Búsqueda por nombre o número de documento
- **WHEN** el usuario ingresa un término de búsqueda (ej. nombre o número de documento) en la barra de búsqueda del listado
- **THEN** el sistema SHALL filtrar la lista en tiempo real para mostrar únicamente los clientes cuyo nombre o número de documento coincida parcialmente con el valor ingresado.

### Requirement: Registro de Cliente con Documento Único (BR-004, BR-005)
El sistema SHALL permitir a los usuarios autorizados registrar un nuevo cliente validando de forma obligatoria que el número de documento ingresado sea único en el sistema.

#### Scenario: Registro exitoso de cliente con documento único
- **WHEN** el usuario completa todos los datos obligatorios del formulario (nombre completo, tipo de documento, número de documento, correo y teléfono) con un número de documento que no existe en el sistema y hace clic en "Guardar"
- **THEN** el sistema SHALL registrar el nuevo cliente en la base de datos e indicar un mensaje de éxito.

#### Scenario: Fallo de registro por documento duplicado
- **WHEN** el usuario intenta registrar un cliente ingresando un número de documento que ya está registrado para otro cliente en el sistema
- **THEN** el sistema SHALL rechazar la creación, no registrar el cliente y mostrar un mensaje de validación indicando que el documento ya existe.

### Requirement: Edición de Datos de Cliente (BR-005, BR-024)
El sistema SHALL permitir editar la información de un cliente existente manteniendo la validación de unicidad del número de documento.

#### Scenario: Edición exitosa de datos
- **WHEN** el usuario modifica los campos (nombre, correo o teléfono) de un cliente con valores válidos y guarda los cambios
- **THEN** el sistema SHALL guardar la información actualizada del cliente, actualizar su fecha de modificación y mostrar un mensaje de éxito.



