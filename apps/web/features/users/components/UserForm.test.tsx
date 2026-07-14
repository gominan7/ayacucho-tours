import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
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

  it("muestra mensaje de error si el submit falla", async () => {
    const mockOnSubmitFail = vi.fn().mockResolvedValue({ success: false, error: "Error al crear" });
    render(
      <UserForm 
        mode="edit" 
        roles={mockRoles} 
        initialValues={{ email: "a@a.com", rol_id: "role-1" }} 
        onSubmit={mockOnSubmitFail} 
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Actualizar Usuario" }));

    expect(await screen.findByText("Error al crear")).toBeInTheDocument();
  });

  it("muestra mensaje de error por defecto si falla sin mensaje", async () => {
    const mockOnSubmitFail = vi.fn().mockResolvedValue({ success: false });
    render(
      <UserForm 
        mode="edit" 
        roles={mockRoles} 
        initialValues={{ email: "a@a.com", rol_id: "role-1" }} 
        onSubmit={mockOnSubmitFail} 
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Actualizar Usuario" }));

    expect(await screen.findByText("Ocurrió un error al procesar el formulario.")).toBeInTheDocument();
  });

  it("muestra mensaje de error si ocurre una excepción", async () => {
    const mockOnSubmitThrow = vi.fn().mockRejectedValue(new Error("Error inesperado"));
    render(
      <UserForm 
        mode="edit" 
        roles={mockRoles} 
        initialValues={{ email: "a@a.com", rol_id: "role-1" }} 
        onSubmit={mockOnSubmitThrow} 
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Actualizar Usuario" }));

    expect(await screen.findByText("Error inesperado")).toBeInTheDocument();
  });
});
