export interface PackageRow {
  id: string;
  nombre: string;
  destino: string;
  descripcion?: string | null;
  precio: number;
  created_at: string;
  updated_at: string;
}

export interface CreatePackagePayload {
  nombre: string;
  destino: string;
  descripcion?: string | null;
  precio: number;
}

export interface UpdatePackagePayload {
  nombre: string;
  destino: string;
  descripcion?: string | null;
  precio: number;
}
