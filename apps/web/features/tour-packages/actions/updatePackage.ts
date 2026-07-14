"use server";

import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { UpdatePackagePayload } from "../types/package";
import { revalidatePath } from "next/cache";

export async function updatePackage(packageId: string, payload: UpdatePackagePayload) {
  try {
    // 1. Check if name already exists for another package
    const { data: existingPackage, error: checkError } = await supabaseAdmin
      .from("paquetes")
      .select("id")
      .eq("nombre", payload.nombre.trim())
      .neq("id", packageId)
      .maybeSingle();

    if (checkError) {
      return { success: false, error: checkError.message };
    }

    if (existingPackage) {
      return {
        success: false,
        error: "El nombre del paquete turístico ya está registrado para otro paquete en el sistema",
      };
    }

    // 2. Update the package record
    const { error: updateError } = await supabaseAdmin
      .from("paquetes")
      .update({
        nombre: payload.nombre.trim(),
        destino: payload.destino.trim(),
        descripcion: payload.descripcion || null,
        precio: payload.precio,
        updated_at: new Date().toISOString(),
      })
      .eq("id", packageId);

    if (updateError) {
      return { success: false, error: `Error al actualizar el paquete turístico: ${updateError.message}` };
    }

    revalidatePath("/tour-packages");
    revalidatePath(`/tour-packages/${packageId}/edit`);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error?.message || "Ocurrió un error inesperado." };
  }
}
