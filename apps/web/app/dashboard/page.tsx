import { getDashboardStats } from "@/features/dashboard/actions/getDashboardStats";
import { KpiCard } from "@/features/dashboard/components/KpiCard";
import { StatsCharts } from "@/features/dashboard/components/StatsCharts";
import { RecentReservationsTable } from "@/features/dashboard/components/RecentReservationsTable";
import Navbar from "@/components/Navbar";
import { Users, Compass, CalendarDays, DollarSign, CreditCard } from "lucide-react";
import type { Metadata } from "next";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Dashboard | Ayacucho Tours",
  description: "Resumen general del estado operativo de la agencia.",
};

export default async function DashboardPage() {
  const res = await getDashboardStats();

  if (!res.success || !res.data) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl">
            <h3 className="font-bold">Error</h3>
            <p>{res.error || "No se pudieron cargar los datos del dashboard."}</p>
          </div>
        </main>
      </div>
    );
  }

  const { kpis, reservationsByState, salesByMethod, recentReservations } = res.data;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col animate-none">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">
            Dashboard General
          </h1>
          <p className="text-zinc-500 mt-1 font-medium">
            Resumen en tiempo real de los indicadores clave y estado del sistema.
          </p>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <KpiCard
            title="Clientes"
            value={kpis.clients}
            icon={<Users className="w-5 h-5 text-indigo-600" />}
            iconBgClass="bg-indigo-50"
            description="Clientes registrados"
          />
          <KpiCard
            title="Paquetes"
            value={kpis.packages}
            icon={<Compass className="w-5 h-5 text-emerald-600" />}
            iconBgClass="bg-emerald-50"
            description="Paquetes turísticos"
          />
          <KpiCard
            title="Reservas"
            value={kpis.reservations}
            icon={<CalendarDays className="w-5 h-5 text-amber-600" />}
            iconBgClass="bg-amber-50"
            description="Total de reservas"
          />
          <KpiCard
            title="Ventas"
            value={kpis.sales}
            icon={<DollarSign className="w-5 h-5 text-sky-600" />}
            iconBgClass="bg-sky-50"
            description="Transacciones de venta"
          />
          <KpiCard
            title="Pagos"
            value={kpis.payments}
            icon={<CreditCard className="w-5 h-5 text-rose-600" />}
            iconBgClass="bg-rose-50"
            description="Abonos registrados"
          />
        </div>

        {/* Charts Section */}
        <StatsCharts
          reservationsByState={reservationsByState}
          salesByMethod={salesByMethod}
        />

        {/* Recent Reservations Table */}
        <RecentReservationsTable reservations={recentReservations} />
      </main>
    </div>
  );
}
