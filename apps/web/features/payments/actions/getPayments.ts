"use server";

import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function getPayments() {
  try {
    const { data: payments = [], error } = await supabaseAdmin
      .from("pagos")
      .select(`
        id,
        venta_id,
        fecha_pago,
        monto_pagado,
        metodo_pago,
        created_at,
        updated_at,
        ventas (
          id,
          fecha_venta,
          monto_total,
          reservas (
            id,
            clientes (
              nombre_completo
            )
          )
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching payments:", error);
      return { success: false, error: `Error al obtener pagos: ${error.message}` };
    }

    const formattedPayments = (payments || []).map((payment: any) => {
      let rawSale = payment.ventas;
      if (Array.isArray(rawSale)) {
        rawSale = rawSale[0];
      }

      let rawRes = rawSale?.reservas;
      if (Array.isArray(rawRes)) {
        rawRes = rawRes[0];
      }

      let rawClient = rawRes?.clientes;
      if (Array.isArray(rawClient)) {
        rawClient = rawClient[0];
      }

      return {
        ...payment,
        ventas: rawSale ? {
          ...rawSale,
          reservas: rawRes ? {
            ...rawRes,
            clientes: rawClient,
          } : null,
        } : null,
      };
    });

    return { success: true, data: formattedPayments };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || "Ocurrió un error inesperado al obtener los pagos.",
    };
  }
}
