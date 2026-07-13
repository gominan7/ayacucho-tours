"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkUser() {
      await supabase.auth.getUser();
      setLoading(false);
    }
    checkUser();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-900" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white border border-slate-200/50 rounded-xl p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">
            ¡Bienvenido al Dashboard!
          </h2>
          <p className="text-zinc-500 mt-2 font-medium">
            Has iniciado sesión correctamente en el sistema AYACUCHO TOURS.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="p-6 border border-slate-100 rounded-xl bg-slate-50/50 transition-all hover:shadow-md">
              <h3 className="font-semibold text-zinc-800">Paquetes Turísticos</h3>
              <p className="text-sm text-zinc-500 mt-1">Gestiona los destinos, itinerarios y precios de paquetes.</p>
            </div>
            <div className="p-6 border border-slate-100 rounded-xl bg-slate-50/50 transition-all hover:shadow-md">
              <h3 className="font-semibold text-zinc-800">Clientes</h3>
              <p className="text-sm text-zinc-500 mt-1">Administra el registro único y documentos de tus clientes.</p>
            </div>
            <div className="p-6 border border-slate-100 rounded-xl bg-slate-50/50 transition-all hover:shadow-md">
              <h3 className="font-semibold text-zinc-800">Reservas y Ventas</h3>
              <p className="text-sm text-zinc-500 mt-1">Registra y controla las reservas, pagos e ingresos.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
