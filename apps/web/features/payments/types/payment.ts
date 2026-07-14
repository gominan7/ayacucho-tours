export interface PaymentRow {
  id: string;
  venta_id: string;
  fecha_pago: string;
  monto_pagado: number;
  metodo_pago: "Efectivo" | "Transferencia" | "Tarjeta";
  created_at: string;
  updated_at: string;
  ventas?: {
    id: string;
    fecha_venta: string;
    monto_total: number;
    reservas?: {
      id: string;
      clientes?: {
        nombre_completo: string;
      } | null;
    } | null;
  } | null;
}

export interface CreatePaymentPayload {
  venta_id: string;
  fecha_pago: string;
  monto_pagado: number;
  metodo_pago: "Efectivo" | "Transferencia" | "Tarjeta";
}

export interface UpdatePaymentPayload {
  venta_id: string;
  fecha_pago: string;
  monto_pagado: number;
  metodo_pago: "Efectivo" | "Transferencia" | "Tarjeta";
}
