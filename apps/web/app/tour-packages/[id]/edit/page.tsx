import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { PackageForm } from "@/features/tour-packages/components/PackageForm";
import Navbar from "@/components/Navbar";
import { updatePackage } from "@/features/tour-packages/actions/updatePackage";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Editar Paquete Turístico | Ayacucho Tours",
  description: "Modifique los datos del paquete turístico.",
};

interface EditPackagePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditPackagePage({ params }: EditPackagePageProps) {
  const { id } = await params;

  // 1. Fetch package data
  const { data: pkg, error: pkgError } = await supabaseAdmin
    .from("paquetes")
    .select("id, nombre, destino, descripcion, precio")
    .eq("id", id)
    .single();

  if (pkgError || !pkg) {
    redirect("/tour-packages");
  }

  // 2. Define Server Action wrapper
  const handleAction = async (values: any) => {
    "use server";
    const res = await updatePackage(id, values);
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
              Editar Paquete Turístico
            </h1>
            <p className="text-zinc-500 mt-1 font-medium">
              Modifique los detalles del paquete turístico en el catálogo de la agencia.
            </p>
          </div>

          <PackageForm
            mode="edit"
            initialValues={{
              nombre: pkg.nombre,
              destino: pkg.destino,
              descripcion: pkg.descripcion,
              precio: Number(pkg.precio),
            }}
            onSubmit={handleAction}
          />
        </div>
      </main>
    </div>
  );
}
