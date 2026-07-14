import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { UserTable } from "./UserTable";
import type { UserRow } from "../types/user";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: vi.fn() }),
}));
vi.mock("next/link", () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));
vi.mock("../actions/toggleUserStatus", () => ({
  toggleUserStatus: vi.fn().mockResolvedValue({ success: true }),
}));

const mockUsers: UserRow[] = [
  {
    id: "u-1",
    email: "admin@test.com",
    rol_id: "role-1",
    estado: "Activo",
    created_at: "2026-07-01",
    updated_at: "2026-07-01",
    roles: { nombre: "Administrador" },
  },
  {
    id: "u-2",
    email: "vendor@test.com",
    rol_id: "role-2",
    estado: "Inactivo",
    created_at: "2026-07-02",
    updated_at: "2026-07-02",
    roles: { nombre: "Vendedor" },
  },
];

describe("UserTable", () => {
  it("renderiza la tabla con datos de usuarios", () => {
    render(<UserTable users={mockUsers} />);

    expect(screen.getByText("admin@test.com")).toBeInTheDocument();
    expect(screen.getByText("vendor@test.com")).toBeInTheDocument();
    expect(screen.getByText("Administrador")).toBeInTheDocument();
    expect(screen.getByText("Vendedor")).toBeInTheDocument();
  });

  it("muestra los encabezados de la tabla", () => {
    render(<UserTable users={mockUsers} />);

    expect(screen.getByText("Correo Electrónico")).toBeInTheDocument();
    expect(screen.getByText("Rol")).toBeInTheDocument();
    expect(screen.getByText("Estado")).toBeInTheDocument();
  });

  it("muestra mensaje cuando no hay usuarios", () => {
    render(<UserTable users={[]} />);

    expect(screen.getByText("No hay usuarios registrados")).toBeInTheDocument();
  });
});
