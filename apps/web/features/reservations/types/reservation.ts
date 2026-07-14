export interface ReservationRow {
  id: string;
  cliente_id: string;
  paquete_id: string;
  fecha_reserva: string;
  cantidad_personas: number;
  estado: "Pendiente" | "Confirmada" | "Cancelada";
  created_at: string;
  updated_at: string;
  clientes?: {
    nombre_completo: string;
  } | null;
  paquetes?: {
    nombre: string;
    precio: number;
  } | null;
}

export interface CreateReservationPayload {
  cliente_id: string;
  paquete_id: string;
  fecha_reserva: string;
  cantidad_personas: number;
  estado?: "Pendiente" | "Confirmada" | "Cancelada";
}

export interface UpdateReservationPayload {
  cliente_id: string;
  paquete_id: string;
  fecha_reserva: string;
  cantidad_personas: number;
  estado: "Pendiente" | "Confirmada" | "Cancelada";
}
