import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { ReservationForm } from "@/features/reservations/components/ReservationForm";
import Navbar from "@/components/Navbar";
import { createReservation } from "@/features/reservations/actions/createReservation";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Registrar Reserva | Ayacucho Tours",
  description: "Registre una nueva reserva de paquete turístico.",
};

export default async function NewReservationPage() {
  // 1. Fetch clients list
  const { data: clients = [] } = await supabaseAdmin
    .from("clientes")
    .select("id, nombre_completo")
    .order("nombre_completo", { ascending: true });

  // 2. Fetch packages list
  const { data: packages = [] } = await supabaseAdmin
    .from("paquetes")
    .select("id, nombre, precio")
    .order("nombre", { ascending: true });

  // 3. Server action handler wrapper
  const handleAction = async (values: any) => {
    "use server";
    const res = await createReservation(values);
    if (res.success) {
      redirect("/reservations");
    }
    return res;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-xl mx-auto flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">
              Registrar Reserva
            </h1>
            <p className="text-zinc-500 mt-1 font-medium">
              Seleccione el cliente y el paquete para registrar la reserva.
            </p>
          </div>

          <ReservationForm
            mode="create"
            clientsList={clients || []}
            packagesList={packages || []}
            onSubmit={handleAction}
          />
        </div>
      </main>
    </div>
  );
}
