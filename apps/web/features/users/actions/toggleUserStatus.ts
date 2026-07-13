"use server";

import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { revalidatePath } from "next/cache";

export async function toggleUserStatus(userId: string) {
  try {
    // 1. Fetch current status of the user
    const { data: user, error: fetchError } = await supabaseAdmin
      .from("usuarios")
      .select("estado")
      .eq("id", userId)
      .single();

    if (fetchError || !user) {
      return { success: false, error: "Usuario no encontrado." };
    }

    const newEstado = user.estado === "Activo" ? "Inactivo" : "Activo";

    // 2. Update user's status in the database
    const { error: updateError } = await supabaseAdmin
      .from("usuarios")
      .update({
        estado: newEstado,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId);

    if (updateError) {
      return { success: false, error: `Error al actualizar el estado: ${updateError.message}` };
    }

    revalidatePath("/users");
    return { success: true, estado: newEstado };
  } catch (error: any) {
    return { success: false, error: error?.message || "Ocurrió un error inesperado." };
  }
}
