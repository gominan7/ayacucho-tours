import { UserForm } from "@/features/users/components/UserForm";
import Navbar from "@/components/Navbar";
import { createUser } from "@/features/users/actions/createUser";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Registrar Usuario | Ayacucho Tours",
  description: "Registre un nuevo usuario y asígnele un rol.",
};

export default async function NewUserPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("sb-session")?.value;
  let roles: { id: string; nombre: string }[] = [];

  if (sessionCookie) {
    try {
      const sessionData = JSON.parse(decodeURIComponent(sessionCookie));
      const accessToken = sessionData?.access_token;
      if (accessToken) {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || "";
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() || "";
        const supabase = createClient(supabaseUrl, supabaseKey, {
          auth: { persistSession: false },
          global: {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        });
        const { data, error } = await supabase
          .from("roles")
          .select("id, nombre")
          .order("nombre", { ascending: true });

        if (error) {
          console.error("Error fetching roles:", error);
        } else {
          roles = data || [];
        }
      }
    } catch (e) {
      console.error("Error parsing session cookie or fetching roles:", e);
    }
  }

  // Define Server Action wrapper to handle redirection
  const handleAction = async (values: { email?: string; contrasena?: string; rol_id: string }) => {
    "use server";
    const res = await createUser({
      email: values.email!,
      contrasena: values.contrasena!,
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
              Registrar Usuario
            </h1>
            <p className="text-zinc-500 mt-1 font-medium">
              Cree un nuevo usuario en la plataforma y asígnele su rol correspondiente.
            </p>
          </div>

          <UserForm
            mode="create"
            roles={roles || []}
            onSubmit={handleAction}
          />
        </div>
      </main>
    </div>
  );
}
