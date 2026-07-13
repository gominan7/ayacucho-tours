# user-management Specification

## Purpose
TBD - created by archiving change rf-002-gestion-usuarios. Update Purpose after archive.
## Requirements
### Requirement: Listar usuarios del sistema
El sistema MUST mostrar al Administrador una tabla paginada con todos los usuarios registrados, incluyendo su correo electrónico, rol y estado (BR-026, BR-027).

#### Scenario: Listado exitoso con usuarios registrados
- **WHEN** el Administrador accede a `/users`
- **THEN** el sistema muestra una tabla con todos los usuarios del sistema, con columnas para correo, rol, estado y acciones

#### Scenario: Listado vacío
- **WHEN** el Administrador accede a `/users` y no existen usuarios registrados
- **THEN** el sistema muestra un mensaje descriptivo indicando que no hay usuarios y un botón para registrar el primero

#### Scenario: Acceso denegado a rol Vendedor
- **WHEN** un usuario con rol `Vendedor` intenta acceder a `/users`
- **THEN** el sistema redirige al usuario a `/dashboard` sin mostrar el módulo de gestión

---

### Requirement: Registrar un nuevo usuario
El sistema MUST permitir al Administrador crear un nuevo usuario en Supabase Auth y en la tabla `usuarios`, asignándole un rol y estableciendo su estado como `'Activo'` por defecto (BR-001, BR-002, BR-028).

#### Scenario: Registro exitoso
- **WHEN** el Administrador completa el formulario con un correo único, contraseña y rol válido, y hace clic en "Guardar"
- **THEN** el sistema crea el usuario en Supabase Auth y en la tabla `usuarios`, y muestra una notificación de éxito redirigiendo al listado

#### Scenario: Correo duplicado
- **WHEN** el Administrador intenta registrar un usuario con un correo que ya existe en el sistema
- **THEN** el sistema muestra un mensaje de error indicando "El correo electrónico ya está registrado en el sistema" sin crear el usuario (BR-001, BR-029)

#### Scenario: Campos incompletos o inválidos
- **WHEN** el Administrador envía el formulario con campos obligatorios vacíos o con formato inválido (correo malformado, contraseña menor a 6 caracteres)
- **THEN** el sistema muestra mensajes de error junto a cada campo inválido sin intentar crear el usuario

---

### Requirement: Editar el rol de un usuario
El sistema MUST permitir al Administrador modificar el rol de un usuario existente (BR-002, BR-026).

#### Scenario: Edición de rol exitosa
- **WHEN** el Administrador selecciona un nuevo rol para el usuario y hace clic en "Actualizar"
- **THEN** el sistema actualiza el campo `rol_id` en la tabla `usuarios` y muestra una notificación de éxito

#### Scenario: Sin cambios detectados
- **WHEN** el Administrador guarda el formulario sin modificar el rol
- **THEN** el sistema no realiza ninguna operación y permanece en la vista sin errores

---

### Requirement: Activar o inactivar un usuario
El sistema MUST permitir al Administrador cambiar el estado de un usuario entre `'Activo'` e `'Inactivo'` sin eliminar físicamente el registro (BR-003, BR-025).

#### Scenario: Inactivar un usuario activo
- **WHEN** el Administrador hace clic en "Inactivar" en el menú de acciones de un usuario activo y confirma la acción
- **THEN** el sistema actualiza el campo `estado` a `'Inactivo'` y refleja el cambio en la tabla, impidiendo que ese usuario inicie sesión (BR-003)

#### Scenario: Activar un usuario inactivo
- **WHEN** el Administrador hace clic en "Activar" en el menú de acciones de un usuario inactivo
- **THEN** el sistema actualiza el campo `estado` a `'Activo'` y el usuario puede volver a iniciar sesión

#### Scenario: Intento de eliminación física
- **WHEN** el Administrador intenta eliminar físicamente un usuario
- **THEN** el sistema no ofrece dicha opción en la interfaz (el botón de eliminar no debe existir)

