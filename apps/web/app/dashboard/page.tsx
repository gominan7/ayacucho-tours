"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { LogOut, User, Compass, Loader2 } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email || null);
      }
      setLoading(false);
    }
    checkUser();
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    // Force a full refresh to delete cookies and re-evaluate Middleware state
    router.refresh();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-900" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header / Navbar */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-900 text-white shadow-sm">
              <Compass className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg text-zinc-900 tracking-tight">
              AYACUCHO TOURS
            </span>
          </div>

          {/* User Profile & Logout */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm font-medium text-zinc-600 bg-slate-100 py-1.5 px-3 rounded-full">
              <User className="w-4 h-4 text-zinc-500" />
              <span>{userEmail || "Cargando usuario..."}</span>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="text-zinc-600 hover:text-zinc-900 border-zinc-200 hover:bg-zinc-50 flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Cerrar Sesión</span>
            </Button>
          </div>
        </div>
      </header>

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
