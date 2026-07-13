"use server";

import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { UpdateUserPayload } from "../types/user";
import { revalidatePath } from "next/cache";

export async function updateUser(userId: string, payload: UpdateUserPayload) {
  try {
    // 1. Fetch the new role name
    const { data: roleData, error: roleError } = await supabaseAdmin
      .from("roles")
      .select("nombre")
      .eq("id", payload.rol_id)
      .single();

    if (roleError || !roleData) {
      return { success: false, error: "El rol seleccionado no es válido." };
    }

    // 2. Update user's role in the database
    const { error: dbError } = await supabaseAdmin
      .from("usuarios")
      .update({
        rol_id: payload.rol_id,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId);

    if (dbError) {
      return { success: false, error: `Error al actualizar el rol en la base de datos: ${dbError.message}` };
    }

    // 3. Update the app_metadata.role in Supabase Auth
    const { error: authError } = await supabaseAdmin.auth.admin.updateUserById(userId, {
      app_metadata: {
        role: roleData.nombre,
      },
    });

    if (authError) {
      // Note: We don't rollback the DB write because we want to maintain database state,
      // but we report the error.
      return {
        success: false,
        error: `El rol se actualizó en la base de datos, pero falló la actualización en Supabase Auth: ${authError.message}`,
      };
    }

    revalidatePath("/users");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error?.message || "Ocurrió un error inesperado." };
  }
}
