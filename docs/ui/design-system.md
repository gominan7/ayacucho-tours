# Design System - AYACUCHO TOURS

## Información General

**Proyecto:** AYACUCHO TOURS

**Versión:** 1.0

**Framework UI:** shadcn/ui

---

# Objetivo

Definir la identidad visual y las reglas de experiencia de usuario que deberán respetarse durante el desarrollo del sistema.

Todas las interfaces generadas mediante OpenSpec deberán seguir este documento.

---

# Filosofía de Diseño

La interfaz deberá transmitir:

- Profesionalismo.
- Confianza.
- Simplicidad.
- Organización.
- Rapidez.
- Modernidad.

El usuario debe poder completar cualquier tarea con la menor cantidad posible de pasos.

---

# Principios de UX

Todas las pantallas deberán cumplir los siguientes principios.

## Simplicidad

Mostrar únicamente la información necesaria.

Evitar elementos innecesarios.

---

## Consistencia

Todos los módulos deberán compartir:

- Colores
- Tipografía
- Espaciado
- Botones
- Tablas
- Formularios
- Iconografía

---

## Accesibilidad

Toda interfaz deberá:

- Ser navegable mediante teclado.
- Tener contraste adecuado.
- Utilizar etiquetas descriptivas.
- Mostrar mensajes claros.

---

## Responsive

La aplicación deberá adaptarse correctamente a:

- Desktop
- Laptop
- Tablet
- Mobile

El diseño será Mobile First.

---

# Identidad Visual

La interfaz deberá utilizar un estilo moderno inspirado en dashboards administrativos.

Características:

- Espacios amplios.
- Bordes suaves.
- Tarjetas limpias.
- Mucho espacio en blanco.
- Iconografía simple.
- Animaciones sutiles.

---

# Colores

Se utilizará el sistema de colores de shadcn/ui.

No se definirán colores manualmente salvo para la identidad institucional.

Colores principales:

Primary

Secondary

Accent

Muted

Destructive

Background

Foreground

---

# Tipografía

Fuente principal:

Inter

Características:

- Alta legibilidad.
- Peso regular para contenido.
- Semibold para títulos.
- Bold únicamente cuando sea necesario.

---

# Componentes

Los componentes deberán provenir preferentemente de shadcn/ui.

Ejemplos:

Button

Input

Card

Dialog

Dropdown Menu

Sheet

Badge

Toast

Table

Tabs

Select

Combobox

Calendar

Popover

Pagination

Breadcrumb

---

# Iconografía

Se utilizará exclusivamente:

Lucide React

No mezclar múltiples librerías de iconos.

---

# Botones

Los botones deberán indicar claramente la acción.

Ejemplos:

Guardar

Actualizar

Eliminar

Cancelar

Reservar

Registrar Pago

Evitar textos ambiguos.

---

# Formularios

Todos los formularios deberán:

- Validar antes del envío.
- Mostrar errores junto al campo.
- Indicar campos obligatorios.
- Mantener un espaciado uniforme.

---

# Tablas

Todas las tablas deberán permitir cuando sea necesario:

- Buscar.
- Ordenar.
- Filtrar.
- Paginar.

Las acciones deberán agruparse en un menú contextual.

---

# Dashboard

Los dashboards deberán mostrar únicamente indicadores relevantes.

Priorizar:

- KPIs
- Gráficos
- Tendencias
- Tarjetas resumen

Evitar saturar la pantalla.

---

# Mensajes

Los mensajes deberán ser:

- Claros.
- Cortos.
- Comprensibles.

Evitar lenguaje técnico.

Ejemplo:

Incorrecto:

Error 500

Correcto:

No fue posible guardar la información.

---

# Notificaciones

Se utilizará Sonner.

Tipos:

- Success
- Error
- Warning
- Info

Las notificaciones deberán ser breves.

---

# Estados Vacíos

Cuando una lista no tenga información deberá mostrarse:

- Ilustración simple (opcional)
- Mensaje descriptivo
- Acción recomendada

Ejemplo:

"Aún no existen clientes registrados."

Botón:

Registrar Cliente

---

# Carga

Todas las operaciones deberán mostrar un estado de carga.

Utilizar:

Skeleton

Spinner

Loading Button

según corresponda.

---

# Confirmaciones

Las operaciones críticas deberán solicitar confirmación.

Ejemplos:

Eliminar usuario

Eliminar paquete

Cancelar reserva

---

# Navegación

La navegación deberá ser consistente.

Elementos principales:

- Sidebar
- Header
- Breadcrumb
- Perfil de usuario

---

# Diseño por Módulos

Todos los módulos deberán seguir la misma estructura visual.

Ejemplo:

Título

Descripción

Acciones

Filtros

Tabla

Paginación

---

# Animaciones

Las animaciones deberán ser:

- Cortas.
- Suaves.
- No invasivas.

Evitar animaciones excesivas.

---

# Componentes Personalizados

Antes de crear un componente nuevo deberá verificarse si existe un componente equivalente en shadcn/ui.

Solo crear componentes personalizados cuando sea estrictamente necesario.

---

# Compatibilidad con OpenSpec

Toda interfaz generada mediante OpenSpec deberá respetar este documento.

No se permitirá utilizar otros sistemas de diseño sin actualizar previamente esta especificación.