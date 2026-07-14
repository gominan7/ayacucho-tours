import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { PackageTable } from "@/features/tour-packages/components/PackageTable";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Compass } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const revalidate = 0; // Disable cache to ensure fresh data

export const metadata: Metadata = {
  title: "Gestión de Paquetes Turísticos | Ayacucho Tours",
  description: "Administre el catálogo de paquetes turísticos de la plataforma.",
};

export default async function TourPackagesPage() {
  const { data: packages, error } = await supabaseAdmin
    .from("paquetes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching packages:", error);
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
                Gestión de Paquetes Turísticos
              </h1>
              <p className="text-zinc-500 mt-1 font-medium">
                Administre el catálogo de paquetes turísticos, destinos y tarifas de la agencia.
              </p>
            </div>
            {packages && packages.length > 0 && (
              <Link href="/tour-packages/new">
                <Button className="bg-zinc-900 hover:bg-zinc-800 text-white font-medium gap-2 shadow-sm transition-all cursor-pointer">
                  <Compass className="w-4 h-4" />
                  Registrar Paquete
                </Button>
              </Link>
            )}
          </div>

          {/* Package Table Component */}
          <PackageTable packages={packages || []} />
        </div>
      </main>
    </div>
  );
}
