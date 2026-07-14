"use server";

import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { UpdateSalePayload } from "../types/sale";
import { revalidatePath } from "next/cache";

export async function updateSale(id: string, payload: UpdateSalePayload) {
  try {
    const { error: updateError } = await supabaseAdmin
      .from("ventas")
      .update({
        reserva_id: payload.reserva_id,
        fecha_venta: payload.fecha_venta,
        monto_total: payload.monto_total,
        metodo_pago: payload.metodo_pago,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (updateError) {
      return {
        success: false,
        error: `Error al actualizar la venta: ${updateError.message}`,
      };
    }

    revalidatePath("/sales");
    revalidatePath(`/sales/${id}/edit`);
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || "Ocurrió un error inesperado.",
    };
  }
}
