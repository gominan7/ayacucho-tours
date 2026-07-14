import { PackageForm } from "@/features/tour-packages/components/PackageForm";
import Navbar from "@/components/Navbar";
import { createPackage } from "@/features/tour-packages/actions/createPackage";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Registrar Paquete Turístico | Ayacucho Tours",
  description: "Registre un nuevo paquete turístico en la plataforma.",
};

export default async function NewPackagePage() {
  // Define Server Action wrapper to handle redirection
  const handleAction = async (values: any) => {
    "use server";
    const res = await createPackage(values);
    if (res.success) {
      redirect("/tour-packages");
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
              Registrar Paquete Turístico
            </h1>
            <p className="text-zinc-500 mt-1 font-medium">
              Cree un nuevo paquete turístico en el catálogo de la agencia.
            </p>
          </div>

          <PackageForm
            mode="create"
            onSubmit={handleAction}
          />
        </div>
      </main>
    </div>
  );
}
