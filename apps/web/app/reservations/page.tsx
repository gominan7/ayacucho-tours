import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { ReservationTable } from "@/features/reservations/components/ReservationTable";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Reservas | Ayacucho Tours",
  description: "Administre las reservas de paquetes turísticos de la agencia.",
};

export default async function ReservationsPage() {
  const { data: reservations = [], error } = await supabaseAdmin
    .from("reservas")
    .select(`
      id,
      cliente_id,
      paquete_id,
      fecha_reserva,
      cantidad_personas,
      estado,
      created_at,
      updated_at,
      clientes (
        nombre_completo
      ),
      paquetes (
        nombre,
        precio
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching reservations:", error);
  }

  const formattedReservations = (reservations || []).map((res: any) => ({
    ...res,
    clientes: Array.isArray(res.clientes) ? res.clientes[0] : res.clientes,
    paquetes: Array.isArray(res.paquetes) ? res.paquetes[0] : res.paquetes,
  }));

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">
                Reservas de Paquetes
              </h1>
              <p className="text-zinc-500 mt-1 font-medium">
                Gestione las reservas, fechas de viaje y estados de sus clientes.
              </p>
            </div>

            <Link href="/reservations/new">
              <Button className="bg-zinc-900 hover:bg-zinc-800 text-white font-medium shadow-sm transition-all flex items-center gap-2 cursor-pointer">
                <Plus className="w-4 h-4" />
                Registrar Reserva
              </Button>
            </Link>
          </div>

          <ReservationTable reservations={formattedReservations} />
        </div>
      </main>
    </div>
  );
}
