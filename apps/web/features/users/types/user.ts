export interface RoleRow {
  id: string;
  nombre: string;
  created_at: string;
  updated_at: string;
}

export interface UserRow {
  id: string;
  email: string;
  rol_id: string;
  estado: "Activo" | "Inactivo";
  created_at: string;
  updated_at: string;
  roles?: {
    nombre: string;
  } | RoleRow;
}

export interface CreateUserPayload {
  email: string;
  contrasena: string;
  rol_id: string;
}

export interface UpdateUserPayload {
  rol_id: string;
}
