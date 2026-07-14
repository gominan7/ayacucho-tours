"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface StatsChartsProps {
  reservationsByState: {
    Pendiente: number;
    Confirmada: number;
    Cancelada: number;
  };
  salesByMethod: {
    Efectivo: number;
    Transferencia: number;
    Tarjeta: number;
  };
}

export function StatsCharts({ reservationsByState, salesByMethod }: StatsChartsProps) {
  // Calculations for Reservations
  const totalReservations =
    reservationsByState.Pendiente +
    reservationsByState.Confirmada +
    reservationsByState.Cancelada;

  const resStates = [
    {
      name: "Confirmadas",
      count: reservationsByState.Confirmada,
      color: "bg-emerald-500",
      bgColor: "bg-emerald-50",
      text: "text-emerald-700",
      dot: "bg-emerald-500",
      pct: totalReservations > 0 ? (reservationsByState.Confirmada / totalReservations) * 100 : 0,
    },
    {
      name: "Pendientes",
      count: reservationsByState.Pendiente,
      color: "bg-amber-500",
      bgColor: "bg-amber-50",
      text: "text-amber-700",
      dot: "bg-amber-500",
      pct: totalReservations > 0 ? (reservationsByState.Pendiente / totalReservations) * 100 : 0,
    },
    {
      name: "Canceladas",
      count: reservationsByState.Cancelada,
      color: "bg-rose-500",
      bgColor: "bg-rose-50",
      text: "text-rose-700",
      dot: "bg-rose-500",
      pct: totalReservations > 0 ? (reservationsByState.Cancelada / totalReservations) * 100 : 0,
    },
  ];

  // Calculations for Sales
  const totalSales =
    salesByMethod.Efectivo +
    salesByMethod.Transferencia +
    salesByMethod.Tarjeta;

  const salesMethods = [
    {
      name: "Efectivo",
      count: salesByMethod.Efectivo,
      color: "bg-indigo-500",
      dot: "bg-indigo-500",
      pct: totalSales > 0 ? (salesByMethod.Efectivo / totalSales) * 100 : 0,
    },
    {
      name: "Transferencia",
      count: salesByMethod.Transferencia,
      color: "bg-sky-500",
      dot: "bg-sky-500",
      pct: totalSales > 0 ? (salesByMethod.Transferencia / totalSales) * 100 : 0,
    },
    {
      name: "Tarjeta",
      count: salesByMethod.Tarjeta,
      color: "bg-blue-500",
      dot: "bg-blue-500",
      pct: totalSales > 0 ? (salesByMethod.Tarjeta / totalSales) * 100 : 0,
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Reservations Chart */}
      <Card className="border-slate-100 shadow-sm bg-white rounded-2xl overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold text-zinc-950">
            Reservas por Estado
          </CardTitle>
          <CardDescription className="text-zinc-500 text-sm">
            Distribución operativa del total de {totalReservations} reservas.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4 space-y-6">
          <div className="space-y-4">
            {resStates.map((state) => (
              <div key={state.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 font-semibold text-zinc-800">
                    <span className={`w-2.5 h-2.5 rounded-full ${state.dot}`} />
                    {state.name}
                  </div>
                  <div className="flex items-center gap-2 font-medium text-zinc-500">
                    <span>{state.count} reservas</span>
                    <span className="text-xs text-zinc-400">({state.pct.toFixed(1)}%)</span>
                  </div>
                </div>
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${state.color} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${state.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sales Payment Method Chart */}
      <Card className="border-slate-100 shadow-sm bg-white rounded-2xl overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold text-zinc-950">
            Ventas por Método de Pago
          </CardTitle>
          <CardDescription className="text-zinc-500 text-sm">
            Uso de canales de pago registrados para el total de {totalSales} ventas.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4 space-y-6">
          <div className="space-y-4">
            {salesMethods.map((method) => (
              <div key={method.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 font-semibold text-zinc-800">
                    <span className={`w-2.5 h-2.5 rounded-full ${method.dot}`} />
                    {method.name}
                  </div>
                  <div className="flex items-center gap-2 font-medium text-zinc-500">
                    <span>{method.count} ventas</span>
                    <span className="text-xs text-zinc-400">({method.pct.toFixed(1)}%)</span>
                  </div>
                </div>
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${method.color} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${method.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
