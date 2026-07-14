"use server";

import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { UpdateClientPayload } from "../types/client";
import { revalidatePath } from "next/cache";

export async function updateClient(clientId: string, payload: UpdateClientPayload) {
  try {
    // 1. Check if document number already exists for another client
    const { data: existingClient, error: checkError } = await supabaseAdmin
      .from("clientes")
      .select("id")
      .eq("nro_documento", payload.nro_documento)
      .neq("id", clientId)
      .maybeSingle();

    if (checkError) {
      return { success: false, error: checkError.message };
    }

    if (existingClient) {
      return {
        success: false,
        error: "El número de documento ya está registrado para otro cliente en el sistema",
      };
    }

    // 2. Update the client record
    const { error: updateError } = await supabaseAdmin
      .from("clientes")
      .update({
        nombre_completo: payload.nombre_completo,
        tipo_documento: payload.tipo_documento,
        nro_documento: payload.nro_documento,
        email: payload.email || null,
        telefono: payload.telefono || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", clientId);

    if (updateError) {
      return { success: false, error: `Error al actualizar el cliente: ${updateError.message}` };
    }

    revalidatePath("/clients");
    revalidatePath(`/clients/${clientId}/edit`);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error?.message || "Ocurrió un error inesperado." };
  }
}
