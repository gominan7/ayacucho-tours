import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { ClientForm } from "@/features/clients/components/ClientForm";
import Navbar from "@/components/Navbar";
import { updateClient } from "@/features/clients/actions/updateClient";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Editar Cliente | Ayacucho Tours",
  description: "Modifique los datos del cliente.",
};

interface EditClientPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditClientPage({ params }: EditClientPageProps) {
  const { id } = await params;

  // 1. Fetch client data
  const { data: client, error: clientError } = await supabaseAdmin
    .from("clientes")
    .select("id, nombre_completo, tipo_documento, nro_documento, email, telefono")
    .eq("id", id)
    .single();

  if (clientError || !client) {
    redirect("/clients");
  }

  // 2. Define Server Action wrapper
  const handleAction = async (values: any) => {
    "use server";
    const res = await updateClient(id, values);
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
              Editar Cliente
            </h1>
            <p className="text-zinc-500 mt-1 font-medium">
              Modifique la información del cliente.
            </p>
          </div>

          <ClientForm
            mode="edit"
            initialValues={client}
            onSubmit={handleAction}
          />
        </div>
      </main>
    </div>
  );
}
