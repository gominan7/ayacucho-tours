import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ReservationForm } from "./ReservationForm";

vi.mock("next/link", () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

const mockClients = [
  { id: "123e4567-e89b-12d3-a456-426614174000", nombre_completo: "Juan Pérez" },
];
const mockPackages = [
  { id: "123e4567-e89b-12d3-a456-426614174001", nombre: "Tour Ayacucho", precio: 250 },
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
          cliente_id: "123e4567-e89b-12d3-a456-426614174000",
          paquete_id: "123e4567-e89b-12d3-a456-426614174001",
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

  it("muestra error si falla el submit", async () => {
    const mockOnSubmitFail = vi.fn().mockResolvedValue({ success: false, error: "Error al registrar reserva" });
    render(
      <ReservationForm
        mode="edit"
        clientsList={mockClients}
        packagesList={mockPackages}
        initialValues={{ cliente_id: "123e4567-e89b-12d3-a456-426614174000", paquete_id: "123e4567-e89b-12d3-a456-426614174001", fecha_reserva: "2026-07-15", cantidad_personas: 2, estado: "Pendiente" }}
        onSubmit={mockOnSubmitFail}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Actualizar Reserva" }));

    expect(await screen.findByText("Error al registrar reserva")).toBeInTheDocument();
  });

  it("muestra error genérico si ocurre excepción", async () => {
    const mockOnSubmitThrow = vi.fn().mockRejectedValue(new Error("Fallo de red"));
    render(
      <ReservationForm
        mode="edit"
        clientsList={mockClients}
        packagesList={mockPackages}
        initialValues={{ cliente_id: "123e4567-e89b-12d3-a456-426614174000", paquete_id: "123e4567-e89b-12d3-a456-426614174001", fecha_reserva: "2026-07-15", cantidad_personas: 2, estado: "Pendiente" }}
        onSubmit={mockOnSubmitThrow}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Actualizar Reserva" }));

    expect(await screen.findByText("Fallo de red")).toBeInTheDocument();
  });
});
