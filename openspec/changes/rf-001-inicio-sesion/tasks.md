## 1. Configuración de Base de Datos (Supabase)

- [x] 1.1 Crear el archivo de migración SQL en `supabase/migrations/20260713000000_create_auth_tables.sql` con las tablas `roles` y `usuarios`, habilitando RLS y sus políticas correspondientes.
- [x] 1.2 Ejecutar la migración SQL en la base de datos de Supabase para crear las tablas físicamente.
- [x] 1.3 Insertar roles semilla (`Administrador`, `Vendedor`) y crear un usuario de prueba en Supabase Auth y en la tabla `usuarios` (con estado "Activo") para validaciones locales.

## 2. Protección de Rutas y Middleware

- [x] 2.1 Crear el Middleware en `apps/web/middleware.ts` para proteger las rutas de administración (`/dashboard`, `/users`, `/clients`, `/tour-packages`, `/reservations`, `/sales`, `/payments`), redirigiendo a `/login` si no hay sesión activa.

## 3. Implementación de Interfaz y Lógica de Auth

- [x] 3.1 Implementar el componente formulario `LoginForm.tsx` en `apps/web/features/auth/components/LoginForm.tsx` utilizando `react-hook-form`, `zod` y componentes de shadcn/ui.
- [x] 3.2 Implementar la llamada de autenticación y la validación de usuario activo (`estado = 'Activo'`) en `LoginForm.tsx`, cerrando sesión en Supabase y mostrando error si el usuario está inactivo (BR-003).
- [x] 3.3 Crear la página de login en `apps/web/app/login/page.tsx` integrando el formulario en una interfaz moderna utilizando componentes de shadcn/ui y respetando el Design System del proyecto.
- [x] 3.4 Modificar `apps/web/app/page.tsx` para redirigir dinámicamente al Dashboard o al Login dependiendo del estado de la sesión.
- [x] 3.5 Crear la vista base `/dashboard` en `apps/web/app/dashboard/page.tsx` con un diseño básico y un botón funcional de "Cerrar Sesión" que limpie cookies y sesión.
