import { getSalesForSelection } from "@/features/payments/actions/getSalesForSelection";
import { PaymentForm } from "@/features/payments/components/PaymentForm";
import Navbar from "@/components/Navbar";
import { createPayment } from "@/features/payments/actions/createPayment";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Registrar Pago | Ayacucho Tours",
  description: "Registre un nuevo pago para una venta realizada.",
};

export default async function NewPaymentPage() {
  const resSales = await getSalesForSelection();
  const salesList = resSales.success ? resSales.data || [] : [];

  const handleCreatePayment = async (values: any) => {
    "use server";
    const res = await createPayment(values);
    if (res.success) {
      redirect("/payments");
    }
    return res;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col animate-none">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-center">
        <PaymentForm
          mode="create"
          salesList={salesList}
          onSubmit={handleCreatePayment}
        />
      </main>
    </div>
  );
}
