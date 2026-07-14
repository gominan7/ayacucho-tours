"use server";

import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { CreatePaymentPayload } from "../types/payment";
import { revalidatePath } from "next/cache";

export async function createPayment(payload: CreatePaymentPayload) {
  try {
    if (payload.monto_pagado <= 0) {
      return {
        success: false,
        error: "El monto del pago debe ser mayor que cero (BR-019).",
      };
    }

    const { error: insertError } = await supabaseAdmin
      .from("pagos")
      .insert({
        venta_id: payload.venta_id,
        fecha_pago: payload.fecha_pago,
        monto_pagado: payload.monto_pagado,
        metodo_pago: payload.metodo_pago,
      });

    if (insertError) {
      return {
        success: false,
        error: `Error al registrar el pago: ${insertError.message}`,
      };
    }

    revalidatePath("/payments");
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || "Ocurrió un error inesperado.",
    };
  }
}
