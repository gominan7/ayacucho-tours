import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SaleForm } from "./SaleForm";

vi.mock("next/link", () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

const mockSalesList = [
  {
    id: "123e4567-e89b-12d3-a456-426614174002",
    fecha_reserva: "2026-07-10",
    clientes: { nombre_completo: "Juan Pérez" },
    paquetes: { nombre: "Tour Ayacucho", precio: 350 },
  },
];

describe("SaleForm", () => {
  const mockOnSubmit = vi.fn().mockResolvedValue({ success: true });

  it("renderiza el formulario en modo crear", () => {
    render(
      <SaleForm mode="create" reservationsList={mockSalesList} onSubmit={mockOnSubmit} />
    );

    expect(screen.getByText("Registrar Nueva Venta")).toBeInTheDocument();
    expect(screen.getByLabelText("Fecha de Venta")).toBeInTheDocument();
    expect(screen.getByLabelText(/Monto Total/)).toBeInTheDocument();
  });

  it("renderiza el formulario en modo editar", () => {
    render(
      <SaleForm
        mode="edit"
        reservationsList={mockSalesList}
        initialValues={{
          reserva_id: "123e4567-e89b-12d3-a456-426614174002",
          fecha_venta: "2026-07-14",
          monto_total: 500,
          metodo_pago: "Tarjeta",
        }}
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.getByText("Editar Detalles de Venta")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2026-07-14")).toBeInTheDocument();
    expect(screen.getByDisplayValue("500")).toBeInTheDocument();
  });

  it("muestra los botones Cancelar y Guardar Venta", () => {
    render(
      <SaleForm mode="create" reservationsList={mockSalesList} onSubmit={mockOnSubmit} />
    );

    expect(screen.getByText("Cancelar")).toBeInTheDocument();
    expect(screen.getByText("Guardar Venta")).toBeInTheDocument();
  });

  it("muestra error si el submit falla", async () => {
    const mockOnSubmitFail = vi.fn().mockResolvedValue({ success: false, error: "Error al guardar venta" });
    render(
      <SaleForm 
        mode="edit" 
        reservationsList={mockSalesList} 
        initialValues={{ reserva_id: "123e4567-e89b-12d3-a456-426614174002", fecha_venta: "2026-07-15", monto_total: 100, metodo_pago: "Efectivo" }} 
        onSubmit={mockOnSubmitFail} 
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Guardar Venta" }));

    expect(await screen.findByText("Error al guardar venta")).toBeInTheDocument();
  });

  it("muestra error genérico si ocurre excepción", async () => {
    const mockOnSubmitThrow = vi.fn().mockRejectedValue(new Error("Error de conexión"));
    render(
      <SaleForm 
        mode="edit" 
        reservationsList={mockSalesList} 
        initialValues={{ reserva_id: "123e4567-e89b-12d3-a456-426614174002", fecha_venta: "2026-07-15", monto_total: 100, metodo_pago: "Efectivo" }} 
        onSubmit={mockOnSubmitThrow} 
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Guardar Venta" }));

    expect(await screen.findByText("Error de conexión")).toBeInTheDocument();
  });
});
