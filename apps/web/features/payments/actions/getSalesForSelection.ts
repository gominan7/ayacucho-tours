"use server";

import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function getSalesForSelection() {
  try {
    const { data: sales = [], error } = await supabaseAdmin
      .from("ventas")
      .select(`
        id,
        fecha_venta,
        monto_total,
        reservas (
          id,
          clientes (
            nombre_completo
          ),
          paquetes (
            nombre
          )
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching sales for selection:", error);
      return { success: false, error: `Error al obtener ventas: ${error.message}` };
    }

    const formattedSales = (sales || []).map((sale: any) => {
      let rawRes = sale.reservas;
      if (Array.isArray(rawRes)) {
        rawRes = rawRes[0];
      }

      let rawClient = rawRes?.clientes;
      if (Array.isArray(rawClient)) {
        rawClient = rawClient[0];
      }

      let rawPackage = rawRes?.paquetes;
      if (Array.isArray(rawPackage)) {
        rawPackage = rawPackage[0];
      }

      return {
        id: sale.id,
        fecha_venta: sale.fecha_venta,
        monto_total: Number(sale.monto_total),
        cliente_nombre: rawClient?.nombre_completo || "Cliente Desconocido",
        paquete_nombre: rawPackage?.nombre || "Paquete Desconocido",
      };
    });

    return { success: true, data: formattedSales };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || "Ocurrió un error inesperado al obtener las ventas.",
    };
  }
}
