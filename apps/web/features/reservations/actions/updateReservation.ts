"use server";

import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { UpdateReservationPayload } from "../types/reservation";
import { revalidatePath } from "next/cache";

export async function updateReservation(
  id: string,
  payload: UpdateReservationPayload
) {
  try {
    const { error: updateError } = await supabaseAdmin
      .from("reservas")
      .update({
        cliente_id: payload.cliente_id,
        paquete_id: payload.paquete_id,
        fecha_reserva: payload.fecha_reserva,
        cantidad_personas: payload.cantidad_personas,
        estado: payload.estado,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (updateError) {
      return {
        success: false,
        error: `Error al actualizar la reserva: ${updateError.message}`,
      };
    }

    revalidatePath("/reservations");
    revalidatePath(`/reservations/${id}/edit`);
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || "Ocurrió un error inesperado.",
    };
  }
}
