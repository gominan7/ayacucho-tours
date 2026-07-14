"use server";

import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { CreatePackagePayload } from "../types/package";
import { revalidatePath } from "next/cache";

export async function createPackage(payload: CreatePackagePayload) {
  try {
    // 1. Check if a package with the same name already exists
    const { data: existingPackage, error: checkError } = await supabaseAdmin
      .from("paquetes")
      .select("id")
      .eq("nombre", payload.nombre.trim())
      .maybeSingle();

    if (checkError) {
      return { success: false, error: checkError.message };
    }

    if (existingPackage) {
      return {
        success: false,
        error: "El nombre del paquete turístico ya está registrado en el sistema",
      };
    }

    // 2. Insert new package into "paquetes" table
    const { error: insertError } = await supabaseAdmin
      .from("paquetes")
      .insert({
        nombre: payload.nombre.trim(),
        destino: payload.destino.trim(),
        descripcion: payload.descripcion || null,
        precio: payload.precio,
      });

    if (insertError) {
      return { success: false, error: `Error al registrar el paquete turístico: ${insertError.message}` };
    }

    revalidatePath("/tour-packages");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error?.message || "Ocurrió un error inesperado." };
  }
}
