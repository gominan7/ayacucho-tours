export interface ClientRow {
  id: string;
  nombre_completo: string;
  tipo_documento: string;
  nro_documento: string;
  email?: string | null;
  telefono?: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateClientPayload {
  nombre_completo: string;
  tipo_documento: string;
  nro_documento: string;
  email?: string | null;
  telefono?: string | null;
}

export interface UpdateClientPayload {
  nombre_completo: string;
  tipo_documento: string;
  nro_documento: string;
  email?: string | null;
  telefono?: string | null;
}
