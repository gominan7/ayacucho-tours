import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { UserForm } from "./UserForm";

vi.mock("next/link", () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

const mockRoles = [
  { id: "role-1", nombre: "Administrador" },
  { id: "role-2", nombre: "Vendedor" },
];

describe("UserForm", () => {
  const mockOnSubmit = vi.fn().mockResolvedValue({ success: true });

  it("renderiza el formulario en modo crear", () => {
    render(<UserForm mode="create" roles={mockRoles} onSubmit={mockOnSubmit} />);

    expect(screen.getByText("Registrar Nuevo Usuario")).toBeInTheDocument();
    expect(screen.getByLabelText("Correo Electrónico")).toBeInTheDocument();
    expect(screen.getByLabelText("Contraseña Temporal")).toBeInTheDocument();
  });

  it("renderiza el formulario en modo editar sin campo de contraseña", () => {
    render(
      <UserForm
        mode="edit"
        roles={mockRoles}
        initialValues={{ id: "u-1", email: "admin@test.com", rol_id: "role-1" }}
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.getByText("Editar Rol de Usuario")).toBeInTheDocument();
    expect(screen.queryByLabelText("Contraseña Temporal")).not.toBeInTheDocument();
  });

  it("muestra los botones correspondientes", () => {
    render(<UserForm mode="create" roles={mockRoles} onSubmit={mockOnSubmit} />);

    expect(screen.getByText("Cancelar")).toBeInTheDocument();
    expect(screen.getByText("Registrar Usuario")).toBeInTheDocument();
  });
});
