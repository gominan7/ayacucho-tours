import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { SaleTable } from "@/features/sales/components/SaleTable";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Ventas | Ayacucho Tours",
  description: "Administre el registro y control de ventas de la agencia.",
};

export default async function SalesPage() {
  const { data: sales = [], error } = await supabaseAdmin
    .from("ventas")
    .select(`
      id,
      reserva_id,
      fecha_venta,
      monto_total,
      metodo_pago,
      created_at,
      updated_at,
      reservas (
        id,
        fecha_reserva,
        clientes (
          nombre_completo
        ),
        paquetes (
          nombre
        )
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching sales:", error);
  }

  const formattedSales = (sales || []).map((sale: any) => {
    let rawRes = sale.reservas;
    if (Array.isArray(rawRes)) {
      rawRes = rawRes[0];
    }
    
    let rawClient = rawRes?.clientes;
    if (Array.isArray(rawClient)) {
      rawClient = rawClient[0];
    }

    let rawPackage = rawRes?.paquetes;
    if (Array.isArray(rawPackage)) {
      rawPackage = rawPackage[0];
    }

    return {
      ...sale,
      reservas: rawRes ? {
        ...rawRes,
        clientes: rawClient,
        paquetes: rawPackage,
      } : null,
    };
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">
                Ventas Realizadas
              </h1>
              <p className="text-zinc-500 mt-1 font-medium">
                Consulte y registre las transacciones financieras asociadas a las reservas.
              </p>
            </div>

            <Link href="/sales/new">
              <Button className="bg-zinc-900 hover:bg-zinc-800 text-white font-medium shadow-sm transition-all flex items-center gap-2 cursor-pointer">
                <Plus className="w-4 h-4" />
                Registrar Venta
              </Button>
            </Link>
          </div>

          <SaleTable sales={formattedSales} />
        </div>
      </main>
    </div>
  );
}
