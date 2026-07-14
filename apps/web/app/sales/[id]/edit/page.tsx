import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { SaleForm } from "@/features/sales/components/SaleForm";
import Navbar from "@/components/Navbar";
import { updateSale } from "@/features/sales/actions/updateSale";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Editar Venta | Ayacucho Tours",
  description: "Edite los detalles de la venta seleccionada.",
};

interface EditSalePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditSalePage({ params }: EditSalePageProps) {
  const { id } = await params;

  // 1. Fetch sale data by ID
  const { data: sale, error: saleError } = await supabaseAdmin
    .from("ventas")
    .select("*")
    .eq("id", id)
    .single();

  if (saleError || !sale) {
    console.error("Error fetching sale:", saleError);
    redirect("/sales");
  }

  // 2. Fetch all reservations
  const { data: reservations = [], error: resError } = await supabaseAdmin
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

  if (resError) {
    console.error("Error fetching reservations:", resError);
  }

  const formattedReservations = (reservations || []).map((res: any) => {
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

  const handleUpdateSale = async (values: any) => {
    "use server";
    const res = await updateSale(id, values);
    if (res.success) {
      redirect("/sales");
    }
    return res;
  };

  const initialValues = {
    reserva_id: sale.reserva_id,
    fecha_venta: sale.fecha_venta,
    monto_total: Number(sale.monto_total),
    metodo_pago: sale.metodo_pago as "Efectivo" | "Transferencia" | "Tarjeta",
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col animate-none">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-center">
        <SaleForm
          mode="edit"
          reservationsList={formattedReservations}
          initialValues={initialValues}
          onSubmit={handleUpdateSale}
        />
      </main>
    </div>
  );
}
