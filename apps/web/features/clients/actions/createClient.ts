"use server";

import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { CreateClientPayload } from "../types/client";
import { revalidatePath } from "next/cache";

export async function createClient(payload: CreateClientPayload) {
  try {
    // 1. Check if document number already exists in database
    const { data: existingClient, error: checkError } = await supabaseAdmin
      .from("clientes")
      .select("id")
      .eq("nro_documento", payload.nro_documento)
      .maybeSingle();

    if (checkError) {
      return { success: false, error: checkError.message };
    }

    if (existingClient) {
      return {
        success: false,
        error: "El número de documento ya está registrado en el sistema",
      };
    }

    // 2. Insert the new client into "clientes" table
    const { error: insertError } = await supabaseAdmin
      .from("clientes")
      .insert({
        nombre_completo: payload.nombre_completo,
        tipo_documento: payload.tipo_documento,
        nro_documento: payload.nro_documento,
        email: payload.email || null,
        telefono: payload.telefono || null,
        is_active: true,
      });

    if (insertError) {
      return { success: false, error: `Error al registrar el cliente: ${insertError.message}` };
    }

    revalidatePath("/clients");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error?.message || "Ocurrió un error inesperado." };
  }
}
