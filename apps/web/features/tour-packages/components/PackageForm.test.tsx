import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { PackageForm } from "./PackageForm";

vi.mock("next/link", () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

describe("PackageForm", () => {
  const mockOnSubmit = vi.fn().mockResolvedValue({ success: true });

  it("renderiza el formulario en modo crear", () => {
    render(<PackageForm mode="create" onSubmit={mockOnSubmit} />);

    expect(screen.getByText("Registrar Nuevo Paquete")).toBeInTheDocument();
    expect(screen.getByLabelText("Nombre del Paquete")).toBeInTheDocument();
    expect(screen.getByLabelText("Destino")).toBeInTheDocument();
    expect(screen.getByLabelText("Precio (PEN)")).toBeInTheDocument();
    expect(screen.getByLabelText(/Descripción/)).toBeInTheDocument();
  });

  it("renderiza el formulario en modo editar con valores iniciales", () => {
    render(
      <PackageForm
        mode="edit"
        initialValues={{
          nombre: "Tour Ayacucho",
          destino: "Ayacucho",
          descripcion: "Visita colonial",
          precio: 350,
        }}
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.getByText("Editar Información del Paquete")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Tour Ayacucho")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Ayacucho")).toBeInTheDocument();
    expect(screen.getByDisplayValue("350")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Visita colonial")).toBeInTheDocument();
  });

  it("muestra los botones correspondientes", () => {
    render(<PackageForm mode="create" onSubmit={mockOnSubmit} />);

    expect(screen.getByText("Cancelar")).toBeInTheDocument();
    expect(screen.getByText("Registrar Paquete")).toBeInTheDocument();
  });
});
