import { ClientForm } from "@/features/clients/components/ClientForm";
import Navbar from "@/components/Navbar";
import { createClient } from "@/features/clients/actions/createClient";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Registrar Cliente | Ayacucho Tours",
  description: "Registre un nuevo cliente en la plataforma.",
};

export default async function NewClientPage() {
  // Define Server Action wrapper to handle redirection
  const handleAction = async (values: any) => {
    "use server";
    const res = await createClient(values);
    if (res.success) {
      redirect("/clients");
    }
    return res;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-xl mx-auto flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">
              Registrar Cliente
            </h1>
            <p className="text-zinc-500 mt-1 font-medium">
              Cree un nuevo cliente en la plataforma para realizar futuras ventas o reservas.
            </p>
          </div>

          <ClientForm
            mode="create"
            onSubmit={handleAction}
          />
        </div>
      </main>
    </div>
  );
}
