"use server";

import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { CreateReservationPayload } from "../types/reservation";
import { revalidatePath } from "next/cache";

export async function createReservation(payload: CreateReservationPayload) {
  try {
    const { error: insertError } = await supabaseAdmin
      .from("reservas")
      .insert({
        cliente_id: payload.cliente_id,
        paquete_id: payload.paquete_id,
        fecha_reserva: payload.fecha_reserva,
        cantidad_personas: payload.cantidad_personas,
        estado: payload.estado || "Pendiente",
      });

    if (insertError) {
      return {
        success: false,
        error: `Error al registrar la reserva: ${insertError.message}`,
      };
    }

    revalidatePath("/reservations");
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || "Ocurrió un error inesperado.",
    };
  }
}
