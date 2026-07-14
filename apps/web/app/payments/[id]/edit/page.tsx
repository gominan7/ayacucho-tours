import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getSalesForSelection } from "@/features/payments/actions/getSalesForSelection";
import { PaymentForm } from "@/features/payments/components/PaymentForm";
import Navbar from "@/components/Navbar";
import { updatePayment } from "@/features/payments/actions/updatePayment";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Editar Pago | Ayacucho Tours",
  description: "Edite los detalles del pago seleccionado.",
};

interface EditPaymentPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPaymentPage({ params }: EditPaymentPageProps) {
  const { id } = await params;

  // 1. Fetch payment data by ID
  const { data: payment, error: paymentError } = await supabaseAdmin
    .from("pagos")
    .select("*")
    .eq("id", id)
    .single();

  if (paymentError || !payment) {
    console.error("Error fetching payment:", paymentError);
    redirect("/payments");
  }

  // 2. Fetch all sales for dropdown selection
  const resSales = await getSalesForSelection();
  const salesList = resSales.success ? resSales.data || [] : [];

  const handleUpdatePayment = async (values: any) => {
    "use server";
    const res = await updatePayment(id, values);
    if (res.success) {
      redirect("/payments");
    }
    return res;
  };

  const initialValues = {
    venta_id: payment.venta_id,
    fecha_pago: payment.fecha_pago,
    monto_pagado: Number(payment.monto_pagado),
    metodo_pago: payment.metodo_pago as "Efectivo" | "Transferencia" | "Tarjeta",
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col animate-none">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-center">
        <PaymentForm
          mode="edit"
          salesList={salesList}
          initialValues={initialValues}
          onSubmit={handleUpdatePayment}
        />
      </main>
    </div>
  );
}
