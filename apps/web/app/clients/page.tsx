import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { ClientTable } from "@/features/clients/components/ClientTable";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const revalidate = 0; // Disable cache to ensure fresh data

export const metadata: Metadata = {
  title: "Gestión de Clientes | Ayacucho Tours",
  description: "Administre el listado, búsqueda y estado de los viajeros en la plataforma.",
};

export default async function ClientsPage() {
  const { data: clients, error } = await supabaseAdmin
    .from("clientes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching clients:", error);
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-6">
          {/* Module Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">
                Gestión de Clientes
              </h1>
              <p className="text-zinc-500 mt-1 font-medium">
                Administre el registro, búsqueda, actualización y estado lógico de los clientes.
              </p>
            </div>
            {clients && clients.length > 0 && (
              <Link href="/clients/new">
                <Button className="bg-zinc-900 hover:bg-zinc-800 text-white font-medium gap-2 shadow-sm transition-all cursor-pointer">
                  <UserPlus className="w-4 h-4" />
                  Registrar Cliente
                </Button>
              </Link>
            )}
          </div>

          {/* Client Table Component */}
          <ClientTable clients={clients || []} />
        </div>
      </main>
    </div>
  );
}
