"use server";

import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { revalidatePath } from "next/cache";

export async function toggleClientStatus(clientId: string) {
  try {
    // 1. Fetch current status of the client
    const { data: client, error: fetchError } = await supabaseAdmin
      .from("clientes")
      .select("is_active")
      .eq("id", clientId)
      .single();

    if (fetchError || !client) {
      return { success: false, error: "Cliente no encontrado." };
    }

    const newStatus = !client.is_active;

    // 2. Update client's status in the database
    const { error: updateError } = await supabaseAdmin
      .from("clientes")
      .update({
        is_active: newStatus,
        updated_at: new Date().toISOString(),
      })
      .eq("id", clientId);

    if (updateError) {
      return { success: false, error: `Error al actualizar el estado: ${updateError.message}` };
    }

    revalidatePath("/clients");
    return { success: true, is_active: newStatus };
  } catch (error: any) {
    return { success: false, error: error?.message || "Ocurrió un error inesperado." };
  }
}
