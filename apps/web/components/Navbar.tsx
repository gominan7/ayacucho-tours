"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { LogOut, User, Compass } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSalesOrAdmin, setIsSalesOrAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email || null);
        const role = user.app_metadata?.role;
        setIsAdmin(role === "Administrador");
        setIsSalesOrAdmin(role === "Administrador" || role === "Vendedor");
      }
      setLoading(false);
    }
    checkUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push("/login");
  };

  return (
    <header className="bg-white border-b border-slate-200/80 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo and Nav links */}
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-900 text-white shadow-sm">
              <Compass className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg text-zinc-900 tracking-tight">
              AYACUCHO TOURS
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/dashboard"
              className={`text-sm font-medium transition-colors ${pathname === "/dashboard"
                  ? "text-zinc-900 font-semibold"
                  : "text-zinc-500 hover:text-zinc-900"
                }`}
            >
              Dashboard
            </Link>
            {isSalesOrAdmin && (
              <Link
                href="/clients"
                className={`text-sm font-medium transition-colors ${pathname.startsWith("/clients")
                    ? "text-zinc-900 font-semibold"
                    : "text-zinc-500 hover:text-zinc-900"
                  }`}
              >
                Clientes
              </Link>
            )}
            {isSalesOrAdmin && (
              <Link
                href="/reservations"
                className={`text-sm font-medium transition-colors ${pathname.startsWith("/reservations")
                    ? "text-zinc-900 font-semibold"
                    : "text-zinc-500 hover:text-zinc-900"
                  }`}
              >
                Reservas
              </Link>
            )}
            {isSalesOrAdmin && (
              <Link
                href="/sales"
                className={`text-sm font-medium transition-colors ${pathname.startsWith("/sales")
                    ? "text-zinc-900 font-semibold"
                    : "text-zinc-500 hover:text-zinc-900"
                  }`}
              >
                Ventas
              </Link>
            )}
            {isSalesOrAdmin && (
              <Link
                href="/payments"
                className={`text-sm font-medium transition-colors ${pathname.startsWith("/payments")
                    ? "text-zinc-900 font-semibold"
                    : "text-zinc-500 hover:text-zinc-900"
                  }`}
              >
                Pagos
              </Link>
            )}
            {isAdmin && (
              <Link
                href="/tour-packages"
                className={`text-sm font-medium transition-colors ${pathname.startsWith("/tour-packages")
                    ? "text-zinc-900 font-semibold"
                    : "text-zinc-500 hover:text-zinc-900"
                  }`}
              >
                Paquetes
              </Link>
            )}
            {isAdmin && (
              <Link
                href="/users"
                className={`text-sm font-medium transition-colors ${pathname.startsWith("/users")
                    ? "text-zinc-900 font-semibold"
                    : "text-zinc-500 hover:text-zinc-900"
                  }`}
              >
                Usuarios
              </Link>
            )}
          </nav>
        </div>

        {/* User Profile & Logout */}
        <div className="flex items-center gap-4">
          {!loading && userEmail && (
            <div className="flex items-center gap-2 text-sm font-medium text-zinc-600 bg-slate-100 py-1.5 px-3 rounded-full">
              <User className="w-4 h-4 text-zinc-500" />
              <span>{userEmail}</span>
            </div>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="text-zinc-600 hover:text-zinc-900 border-zinc-200 hover:bg-zinc-50 flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Cerrar Sesión</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
