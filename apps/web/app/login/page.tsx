import type { Metadata } from "next";
import LoginForm from "@/features/auth/components/LoginForm";
import { Compass } from "lucide-react";

export const metadata: Metadata = {
  title: "Iniciar Sesión | AYACUCHO TOURS",
  description: "Accede al sistema interno de gestión de AYACUCHO TOURS. Administra paquetes, clientes, reservas y pagos.",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-slate-50 relative overflow-hidden">
      {/* Decorative background grid pattern and radial gradients */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60" />
      
      {/* Soft color blobs for ambient glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md flex flex-col items-center gap-6">
        {/* Branding header */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-zinc-900 text-white shadow-lg shadow-zinc-950/20">
            <Compass className="w-6 h-6 animate-pulse" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 mt-2">
            AYACUCHO TOURS
          </h1>
          <p className="text-sm text-zinc-500 font-medium max-w-[280px]">
            Portal de Gestión Turística e Inventario
          </p>
        </div>

        {/* LoginForm Container */}
        <LoginForm />

        {/* Footer info */}
        <footer className="text-xs text-zinc-400 mt-4">
          &copy; {new Date().getFullYear()} Ayacucho Tours. Todos los derechos reservados.
        </footer>
      </div>
    </main>
  );
}
