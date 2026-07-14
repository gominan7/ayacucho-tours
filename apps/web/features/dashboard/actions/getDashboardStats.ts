"use server";

import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function getDashboardStats() {
  try {
    // 1. Fetch count totals in parallel
    const [
      clientsRes,
      packagesRes,
      reservationsRes,
      salesRes,
      paymentsRes,
      statesRes,
      methodsRes,
      recentRes
    ] = await Promise.all([
      supabaseAdmin.from("clientes").select("*", { count: "exact", head: true }),
      supabaseAdmin.from("paquetes").select("*", { count: "exact", head: true }),
      supabaseAdmin.from("reservas").select("*", { count: "exact", head: true }),
      supabaseAdmin.from("ventas").select("*", { count: "exact", head: true }),
      supabaseAdmin.from("pagos").select("*", { count: "exact", head: true }),
      supabaseAdmin.from("reservas").select("estado"),
      supabaseAdmin.from("ventas").select("metodo_pago"),
      supabaseAdmin.from("reservas")
        .select(`
          id,
          fecha_reserva,
          created_at,
          clientes (
            nombre_completo
          ),
          paquetes (
            nombre
          )
        `)
        .order("created_at", { ascending: false })
        .limit(5)
    ]);

    // Check errors
    if (clientsRes.error) throw clientsRes.error;
    if (packagesRes.error) throw packagesRes.error;
    if (reservationsRes.error) throw reservationsRes.error;
    if (salesRes.error) throw salesRes.error;
    if (paymentsRes.error) throw paymentsRes.error;
    if (statesRes.error) throw statesRes.error;
    if (methodsRes.error) throw methodsRes.error;
    if (recentRes.error) throw recentRes.error;

    // Process counts
    const kpis = {
      clients: clientsRes.count || 0,
      packages: packagesRes.count || 0,
      reservations: reservationsRes.count || 0,
      sales: salesRes.count || 0,
      payments: paymentsRes.count || 0,
    };

    // Group reservations by state
    const reservationsByState = (statesRes.data || []).reduce((acc: any, curr: any) => {
      const state = curr.estado || "Pendiente";
      acc[state] = (acc[state] || 0) + 1;
      return acc;
    }, { Pendiente: 0, Confirmada: 0, Cancelada: 0 });

    // Group sales by payment method
    const salesByMethod = (methodsRes.data || []).reduce((acc: any, curr: any) => {
      const method = curr.metodo_pago || "Efectivo";
      acc[method] = (acc[method] || 0) + 1;
      return acc;
    }, { Efectivo: 0, Transferencia: 0, Tarjeta: 0 });

    // Format recent reservations list
    const formattedRecentReservations = (recentRes.data || []).map((res: any) => {
      let rawClient = res.clientes;
      if (Array.isArray(rawClient)) {
        rawClient = rawClient[0];
      }
      let rawPackage = res.paquetes;
      if (Array.isArray(rawPackage)) {
        rawPackage = rawPackage[0];
      }
      return {
        id: res.id,
        fecha_reserva: res.fecha_reserva,
        cliente_nombre: rawClient?.nombre_completo || "Cliente Desconocido",
        paquete_nombre: rawPackage?.nombre || "Paquete Desconocido",
      };
    });

    return {
      success: true,
      data: {
        kpis,
        reservationsByState,
        salesByMethod,
        recentReservations: formattedRecentReservations,
      }
    };
  } catch (error: any) {
    console.error("Error in getDashboardStats:", error);
    return {
      success: false,
      error: error?.message || "Ocurrió un error al obtener estadísticas del dashboard.",
    };
  }
}
