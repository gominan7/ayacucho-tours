import { getPayments } from "@/features/payments/actions/getPayments";
import { PaymentTable } from "@/features/payments/components/PaymentTable";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Pagos | Ayacucho Tours",
  description: "Administre el registro y control de pagos de la agencia.",
};

export default async function PaymentsPage() {
  const res = await getPayments();
  const payments = res.success ? res.data || [] : [];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col animate-none">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">
                Control de Pagos
              </h1>
              <p className="text-zinc-500 mt-1 font-medium">
                Consulte y registre las transacciones de pago asociadas a las ventas.
              </p>
            </div>

            <Link href="/payments/new">
              <Button className="bg-zinc-900 hover:bg-zinc-800 text-white font-medium shadow-sm transition-all flex items-center gap-2 cursor-pointer">
                <Plus className="w-4 h-4" />
                Registrar Pago
              </Button>
            </Link>
          </div>

          <PaymentTable payments={payments} />
        </div>
      </main>
    </div>
  );
}
