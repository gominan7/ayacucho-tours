import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ClientForm } from "./ClientForm";

// Mock next/link
vi.mock("next/link", () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

describe("ClientForm", () => {
  const mockOnSubmit = vi.fn().mockResolvedValue({ success: true });

  it("renderiza el formulario en modo crear", () => {
    render(<ClientForm mode="create" onSubmit={mockOnSubmit} />);

    expect(screen.getByText("Registrar Nuevo Cliente")).toBeInTheDocument();
    expect(screen.getByLabelText("Nombre Completo")).toBeInTheDocument();
    expect(screen.getByLabelText("Número de Documento")).toBeInTheDocument();
    expect(screen.getByLabelText(/Correo Electrónico/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Teléfono/)).toBeInTheDocument();
  });

  it("renderiza el formulario en modo editar", () => {
    render(
      <ClientForm
        mode="edit"
        initialValues={{
          nombre_completo: "Juan Pérez",
          tipo_documento: "DNI",
          nro_documento: "12345678",
          email: "juan@test.com",
          telefono: "999888777",
        }}
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.getByText("Editar Información del Cliente")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Juan Pérez")).toBeInTheDocument();
    expect(screen.getByDisplayValue("12345678")).toBeInTheDocument();
    expect(screen.getByDisplayValue("juan@test.com")).toBeInTheDocument();
    expect(screen.getByDisplayValue("999888777")).toBeInTheDocument();
  });

  it("muestra los botones Cancelar y Registrar Cliente", () => {
    render(<ClientForm mode="create" onSubmit={mockOnSubmit} />);

    expect(screen.getByText("Cancelar")).toBeInTheDocument();
    expect(screen.getByText("Registrar Cliente")).toBeInTheDocument();
  });

  it("muestra el botón Actualizar Cliente en modo editar", () => {
    render(<ClientForm mode="edit" onSubmit={mockOnSubmit} />);

    expect(screen.getByText("Actualizar Cliente")).toBeInTheDocument();
  });

  it("muestra error si el submit falla", async () => {
    const mockOnSubmitFail = vi.fn().mockResolvedValue({ success: false, error: "Error al registrar cliente" });
    render(
      <ClientForm 
        mode="edit" 
        initialValues={{ nombre_completo: "A", tipo_documento: "DNI", nro_documento: "1", email: "a@a.com", telefono: "1" }} 
        onSubmit={mockOnSubmitFail} 
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Actualizar Cliente" }));

    expect(await screen.findByText("Error al registrar cliente")).toBeInTheDocument();
  });

  it("muestra error si ocurre una excepción", async () => {
    const mockOnSubmitThrow = vi.fn().mockRejectedValue(new Error("Error de conexión"));
    render(
      <ClientForm 
        mode="edit" 
        initialValues={{ nombre_completo: "A", tipo_documento: "DNI", nro_documento: "1", email: "a@a.com", telefono: "1" }} 
        onSubmit={mockOnSubmitThrow} 
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Actualizar Cliente" }));

    expect(await screen.findByText("Error de conexión")).toBeInTheDocument();
  });
});
