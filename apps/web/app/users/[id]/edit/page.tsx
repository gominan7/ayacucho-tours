import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { UserForm } from "@/features/users/components/UserForm";
import Navbar from "@/components/Navbar";
import { updateUser } from "@/features/users/actions/updateUser";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Editar Usuario | Ayacucho Tours",
  description: "Modifique el rol asignado al usuario.",
};

interface EditUserPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditUserPage({ params }: EditUserPageProps) {
  const { id } = await params;

  // 1. Fetch user data
  const { data: user, error: userError } = await supabaseAdmin
    .from("usuarios")
    .select("id, email, rol_id")
    .eq("id", id)
    .single();

  if (userError || !user) {
    redirect("/users");
  }

  // 2. Fetch available roles
  const { data: roles, error: rolesError } = await supabaseAdmin
    .from("roles")
    .select("id, nombre")
    .order("nombre", { ascending: true });

  if (rolesError) {
    console.error("Error fetching roles:", rolesError);
  }

  // 3. Define Server Action wrapper
  const handleAction = async (values: { rol_id: string }) => {
    "use server";
    const res = await updateUser(id, {
      rol_id: values.rol_id,
    });
    if (res.success) {
      redirect("/users");
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
              Editar Usuario
            </h1>
            <p className="text-zinc-500 mt-1 font-medium">
              Modifique el rol asignado al usuario. El correo electrónico no es editable.
            </p>
          </div>

          <UserForm
            mode="edit"
            initialValues={{
              id: user.id,
              email: user.email,
              rol_id: user.rol_id,
            }}
            roles={roles || []}
            onSubmit={handleAction}
          />
        </div>
      </main>
    </div>
  );
}
