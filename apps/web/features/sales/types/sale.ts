export interface SaleRow {
  id: string;
  reserva_id: string;
  fecha_venta: string;
  monto_total: number;
  metodo_pago: "Efectivo" | "Transferencia" | "Tarjeta";
  created_at: string;
  updated_at: string;
  reservas?: {
    id: string;
    fecha_reserva: string;
    clientes?: {
      nombre_completo: string;
    } | null;
    paquetes?: {
      nombre: string;
    } | null;
  } | null;
}

export interface CreateSalePayload {
  reserva_id: string;
  fecha_venta: string;
  monto_total: number;
  metodo_pago: "Efectivo" | "Transferencia" | "Tarjeta";
}

export interface UpdateSalePayload {
  reserva_id: string;
  fecha_venta: string;
  monto_total: number;
  metodo_pago: "Efectivo" | "Transferencia" | "Tarjeta";
}
