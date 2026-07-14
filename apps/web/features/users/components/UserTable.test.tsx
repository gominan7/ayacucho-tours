import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
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

  it("muestra error si falla al cambiar estado del usuario", async () => {
    const { toggleUserStatus } = await import("../actions/toggleUserStatus");
    (toggleUserStatus as any).mockResolvedValueOnce({ success: false, error: "Error al cambiar estado" });

    render(<UserTable users={mockUsers} />);

    // Click the toggle button for the first user
    const buttons = screen.getAllByRole("button", { name: "Menú de acciones" });
    fireEvent.click(buttons[0]);
    
    const toggleButton = screen.getByText("Inactivar");
    fireEvent.click(toggleButton);

    expect(await screen.findByText("Error al cambiar estado")).toBeInTheDocument();
  });

  it("muestra error inesperado si toggle lanza excepción", async () => {
    const { toggleUserStatus } = await import("../actions/toggleUserStatus");
    (toggleUserStatus as any).mockRejectedValueOnce(new Error("Error de conexión"));

    render(<UserTable users={mockUsers} />);

    const buttons = screen.getAllByRole("button", { name: "Menú de acciones" });
    fireEvent.click(buttons[0]);
    
    const toggleButton = screen.getByText("Inactivar");
    fireEvent.click(toggleButton);

    expect(await screen.findByText("Error de conexión")).toBeInTheDocument();
  });
});
