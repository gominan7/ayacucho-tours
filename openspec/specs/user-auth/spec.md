# user-auth Specification

## Purpose
TBD - created by archiving change rf-001-inicio-sesion. Update Purpose after archive.
## Requirements
### Requirement: Autenticación de usuario por correo y contraseña
El sistema MUST autenticar a los usuarios utilizando su correo electrónico y contraseña registrados a través de Supabase Auth (BR-028). Solo los usuarios con estado activo en el sistema podrán iniciar sesión (BR-003).

#### Scenario: Inicio de sesión exitoso
- **WHEN** el usuario ingresa un correo electrónico y una contraseña válidos correspondientes a un usuario registrado y activo, y hace clic en "Iniciar Sesión"
- **THEN** el sistema crea la sesión activa y redirige al usuario al Dashboard (`/dashboard`)

#### Scenario: Inicio de sesión fallido por credenciales inválidas
- **WHEN** el usuario ingresa un correo electrónico o una contraseña incorrectos, y hace clic en "Iniciar Sesión"
- **THEN** el sistema no inicia sesión y muestra el mensaje de error "Credenciales incorrectas"

#### Scenario: Inicio de sesión fallido por usuario inactivo
- **WHEN** el usuario ingresa credenciales válidas pero correspondientes a una cuenta de usuario inactiva (BR-003), y hace clic en "Iniciar Sesión"
- **THEN** el sistema no inicia sesión y muestra el mensaje de error "El usuario se encuentra inactivo. Contacte al administrador"

### Requirement: Cierre de sesión de usuario
El sistema MUST permitir a los usuarios autenticados cerrar su sesión activa para evitar accesos no autorizados.

#### Scenario: Cierre de sesión exitoso
- **WHEN** el usuario autenticado hace clic en la opción "Cerrar Sesión" en la barra de navegación o Dashboard
- **THEN** el sistema destruye la sesión activa en Supabase Auth y redirige al usuario a la vista de inicio de sesión (`/login`)

### Requirement: Protección de rutas y control de accesos
El sistema MUST proteger todas las rutas privadas (incluyendo `/dashboard` y subrutas) para restringir el acceso únicamente a usuarios autenticados (BR-026, BR-027, BR-028).

#### Scenario: Acceso restringido para usuarios no autenticados
- **WHEN** un usuario que no ha iniciado sesión intenta ingresar a una ruta protegida como `/dashboard`
- **THEN** el sistema bloquea el acceso y lo redirige automáticamente a `/login`

#### Scenario: Acceso permitido para usuarios autenticados
- **WHEN** un usuario con una sesión válida intenta ingresar a `/dashboard`
- **THEN** el sistema permite el acceso y renderiza la pantalla correspondiente sin redirección

