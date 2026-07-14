import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { SaleForm } from "@/features/sales/components/SaleForm";
import Navbar from "@/components/Navbar";
import { createSale } from "@/features/sales/actions/createSale";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Registrar Venta | Ayacucho Tours",
  description: "Registre una nueva transacción de venta para una reserva.",
};

export default async function NewSalePage() {
  // Fetch reservations with their client and package details
  const { data: reservations = [], error } = await supabaseAdmin
    .from("reservas")
    .select(`
      id,
      fecha_reserva,
      estado,
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

  // Filter out Cancelled reservations for safety, keeping Pending and Confirmed ones
  const filteredReservations = (reservations || [])
    .filter((res: any) => res.estado !== "Cancelada")
    .map((res: any) => {
      let rawClient = res.clientes;
      if (Array.isArray(rawClient)) {
        rawClient = rawClient[0];
      }
      let rawPackage = res.paquetes;
      if (Array.isArray(rawPackage)) {
        rawPackage = rawPackage[0];
      }
      return {
        ...res,
        clientes: rawClient,
        paquetes: rawPackage,
      };
    });

  const handleCreateSale = async (values: any) => {
    "use server";
    const res = await createSale(values);
    if (res.success) {
      redirect("/sales");
    }
    return res;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col animate-none">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-center">
        <SaleForm
          mode="create"
          reservationsList={filteredReservations}
          onSubmit={handleCreateSale}
        />
      </main>
    </div>
  );
}
