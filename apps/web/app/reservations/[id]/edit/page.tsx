import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { ReservationForm } from "@/features/reservations/components/ReservationForm";
import Navbar from "@/components/Navbar";
import { updateReservation } from "@/features/reservations/actions/updateReservation";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Editar Reserva | Ayacucho Tours",
  description: "Modifique los datos de la reserva.",
};

interface EditReservationPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditReservationPage({
  params,
}: EditReservationPageProps) {
  const { id } = await params;

  // 1. Fetch reservation data
  const { data: resData, error: resError } = await supabaseAdmin
    .from("reservas")
    .select(
      "id, cliente_id, paquete_id, fecha_reserva, cantidad_personas, estado"
    )
    .eq("id", id)
    .single();

  if (resError || !resData) {
    redirect("/reservations");
  }

  // 2. Fetch clients list
  const { data: clients = [] } = await supabaseAdmin
    .from("clientes")
    .select("id, nombre_completo")
    .order("nombre_completo", { ascending: true });

  // 3. Fetch packages list
  const { data: packages = [] } = await supabaseAdmin
    .from("paquetes")
    .select("id, nombre, precio")
    .order("nombre", { ascending: true });

  // 4. Define Server Action wrapper
  const handleAction = async (values: any) => {
    "use server";
    const res = await updateReservation(id, values);
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
              Editar Reserva
            </h1>
            <p className="text-zinc-500 mt-1 font-medium">
              Modifique los detalles de la reserva de paquete turístico.
            </p>
          </div>

          <ReservationForm
            mode="edit"
            clientsList={clients || []}
            packagesList={packages || []}
            initialValues={{
              cliente_id: resData.cliente_id,
              paquete_id: resData.paquete_id,
              fecha_reserva: resData.fecha_reserva,
              cantidad_personas: Number(resData.cantidad_personas),
              estado: resData.estado as any,
            }}
            onSubmit={handleAction}
          />
        </div>
      </main>
    </div>
  );
}
