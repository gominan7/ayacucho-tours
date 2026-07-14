## Context

Este diseño detalla la implementación del módulo de Dashboard (RF-008) para el sistema AYACUCHO TOURS. El sistema cuenta con módulos operativos completos (clientes, paquetes, reservas, ventas, pagos) pero carece de una pantalla centralizada de control que resuma la información clave para administradores y vendedores.

## Goals / Non-Goals

**Goals:**
- Implementar la vista del Dashboard en la ruta `/dashboard`.
- Mostrar 5 tarjetas de KPI: Total de clientes, Total de paquetes, Total de reservas, Total de ventas y Total de pagos.
- Crear gráficos de resumen visuales.
- Mostrar una tabla con las 5 reservas más recientes.
- Validar el acceso al Dashboard.

**Non-Goals:**
- Implementar análisis predictivo o proyecciones financieras.
- Generación de reportes PDF/Excel descargables.
- Gráficos avanzados e interactivos con Zoom/Pan.
- Filtros avanzados por rangos de fecha o parámetros complejos en este MVP.

## Decisions

### 1. Obtención de Datos
Se creará un Server Action `getDashboardStats` para obtener:
- Conteo total de clientes.
- Conteo total de paquetes.
- Conteo total de reservas.
- Conteo total de ventas.
- Conteo total de pagos.
- Últimas 5 reservas.

### 2. Componentización del Módulo
La característica se ubicará en `apps/web/features/dashboard/`:
- `components/KpiCard.tsx`: Tarjeta KPI individual con ícono y título.
- `components/StatsCharts.tsx`: Contenedor de gráficos.
- `components/RecentReservations.tsx`: Tabla de últimas reservas.
- `actions/getDashboardStats.ts`: Lógica de consultas Supabase.

