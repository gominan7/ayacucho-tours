"use server";

import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { CreateSalePayload } from "../types/sale";
import { revalidatePath } from "next/cache";

export async function createSale(payload: CreateSalePayload) {
  try {
    const { error: insertError } = await supabaseAdmin
      .from("ventas")
      .insert({
        reserva_id: payload.reserva_id,
        fecha_venta: payload.fecha_venta,
        monto_total: payload.monto_total,
        metodo_pago: payload.metodo_pago,
      });

    if (insertError) {
      return {
        success: false,
        error: `Error al registrar la venta: ${insertError.message}`,
      };
    }

    revalidatePath("/sales");
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || "Ocurrió un error inesperado.",
    };
  }
}
