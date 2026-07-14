"use server";

import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { UpdatePaymentPayload } from "../types/payment";
import { revalidatePath } from "next/cache";

export async function updatePayment(id: string, payload: UpdatePaymentPayload) {
  try {
    if (payload.monto_pagado <= 0) {
      return {
        success: false,
        error: "El monto del pago debe ser mayor que cero (BR-019).",
      };
    }

    const { error: updateError } = await supabaseAdmin
      .from("pagos")
      .update({
        venta_id: payload.venta_id,
        fecha_pago: payload.fecha_pago,
        monto_pagado: payload.monto_pagado,
        metodo_pago: payload.metodo_pago,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (updateError) {
      return {
        success: false,
        error: `Error al actualizar el pago: ${updateError.message}`,
      };
    }

    revalidatePath("/payments");
    revalidatePath(`/payments/${id}/edit`);
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || "Ocurrió un error inesperado.",
    };
  }
}
