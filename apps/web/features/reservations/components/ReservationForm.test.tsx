import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ReservationForm } from "./ReservationForm";

vi.mock("next/link", () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

const mockClients = [
  { id: "cli-1", nombre_completo: "Juan Pérez" },
];
const mockPackages = [
  { id: "pkg-1", nombre: "Tour Ayacucho", precio: 250 },
];

describe("ReservationForm", () => {
  const mockOnSubmit = vi.fn().mockResolvedValue({ success: true });

  it("renderiza el formulario en modo crear", () => {
    render(
      <ReservationForm
        mode="create"
        clientsList={mockClients}
        packagesList={mockPackages}
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.getByText("Registrar Nueva Reserva")).toBeInTheDocument();
    expect(screen.getByLabelText("Fecha de Reserva")).toBeInTheDocument();
    expect(screen.getByLabelText("Cantidad de Personas")).toBeInTheDocument();
  });

  it("renderiza el formulario en modo editar", () => {
    render(
      <ReservationForm
        mode="edit"
        clientsList={mockClients}
        packagesList={mockPackages}
        initialValues={{
          cliente_id: "cli-1",
          paquete_id: "pkg-1",
          fecha_reserva: "2026-07-14",
          cantidad_personas: 4,
          estado: "Confirmada",
        }}
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.getByText("Editar Detalles de la Reserva")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2026-07-14")).toBeInTheDocument();
    expect(screen.getByDisplayValue("4")).toBeInTheDocument();
  });

  it("muestra los botones correspondientes", () => {
    render(
      <ReservationForm
        mode="create"
        clientsList={mockClients}
        packagesList={mockPackages}
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.getByText("Cancelar")).toBeInTheDocument();
    expect(screen.getByText("Registrar Reserva")).toBeInTheDocument();
  });
});
