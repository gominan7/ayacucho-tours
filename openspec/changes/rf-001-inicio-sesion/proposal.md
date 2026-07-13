## Why

Actualmente, el sistema AYACUCHO TOURS no cuenta con un mecanismo de autenticación, lo que permite acceso público a rutas y datos sensibles. La implementación de la funcionalidad de inicio de sesión (RF-001) es prioritaria para restringir el acceso únicamente a usuarios administradores y vendedores registrados y activos, garantizando la seguridad, trazabilidad e integridad de la información según las reglas de negocio (BR-003, BR-026, BR-027, BR-028).

## What Changes

- **Interfaz de Inicio de Sesión**: Creación de una página de login (`/login`) moderna, responsiva y estéticamente atractiva siguiendo la guía de diseño del proyecto.
- **Integración con Supabase Auth**: Uso de Supabase Auth para la autenticación mediante correo electrónico y contraseña. Los usuarios serán creados previamente por un administrador del sistema y no existirá registro público de usuarios.
- **Control de Acceso y Estado de Usuario**: Validación adicional durante el inicio de sesión para verificar que el usuario esté registrado en la base de datos y que su estado sea "activo" (respetando BR-003).
- **Protección de Rutas (Middleware)**: Implementación de un middleware de Next.js para proteger las rutas privadas (Dashboard y módulos de gestión) redirigiendo a los usuarios no autenticados al Login.
- **Redirección al Dashboard**: Al iniciar sesión con éxito, redirección automática al Dashboard (`/dashboard`).
- **Cierre de Sesión**: Opción visible y funcional para cerrar sesión desde el layout principal del sistema, destruyendo la sesión activa y redirigiendo al Login.
- **Mensajería de Error**: Visualización de mensajes claros ante credenciales incorrectas, cuenta inactiva o fallas de red.

## Capabilities

### New Capabilities
- `user-auth`: Implementación del inicio de sesión (correo/contraseña), cierre de sesión, persistencia de sesión por Supabase Auth, validación de estado de usuario activo (BR-003) y protección de rutas.

### Modified Capabilities
*Ninguna (esta es la primera funcionalidad base del sistema).*

## Impact

- **Rutas y Vistas**:
  - Nueva ruta `/login` para el formulario de acceso.
  - Modificación de la raíz (`/`) para redirigir dinámicamente a `/dashboard` si hay sesión activa, o a `/login` si no la hay.
- **Middleware**:
  - Creación de `middleware.ts` en la raíz de `apps/web` para interceptar peticiones a `/dashboard` y subrutas.
- **Base de Datos**:
  - Consulta a la tabla usuarios para verificar que el usuario autenticado exista en el sistema y que su estado sea "Activo", de acuerdo con la regla de negocio BR-003.
- **Dependencias**:
  - Uso de `@supabase/supabase-js` para control de sesión del lado del cliente y del servidor.
