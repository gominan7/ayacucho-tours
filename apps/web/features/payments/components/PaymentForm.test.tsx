import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PaymentForm } from "./PaymentForm";

vi.mock("next/link", () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

const mockSalesList = [
  {
    id: "123e4567-e89b-12d3-a456-426614174003",
    fecha_venta: "2026-07-10",
    monto_total: 500,
    cliente_nombre: "Juan Pérez",
    paquete_nombre: "Tour Ayacucho",
  },
];

describe("PaymentForm", () => {
  const mockOnSubmit = vi.fn().mockResolvedValue({ success: true });

  it("renderiza el formulario en modo crear", () => {
    render(
      <PaymentForm mode="create" salesList={mockSalesList} onSubmit={mockOnSubmit} />
    );

    expect(screen.getByText("Registrar Nuevo Pago")).toBeInTheDocument();
    expect(screen.getByLabelText("Fecha de Pago")).toBeInTheDocument();
    expect(screen.getByLabelText(/Monto Pagado/)).toBeInTheDocument();
  });

  it("renderiza el formulario en modo editar", () => {
    render(
      <PaymentForm
        mode="edit"
        salesList={mockSalesList}
        initialValues={{
          venta_id: "123e4567-e89b-12d3-a456-426614174003",
          fecha_pago: "2026-07-14",
          monto_pagado: 200,
          metodo_pago: "Transferencia",
        }}
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.getByText("Editar Detalles de Pago")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2026-07-14")).toBeInTheDocument();
    expect(screen.getByDisplayValue("200")).toBeInTheDocument();
  });

  it("muestra los botones Cancelar y Guardar Pago", () => {
    render(
      <PaymentForm mode="create" salesList={mockSalesList} onSubmit={mockOnSubmit} />
    );

    expect(screen.getByText("Cancelar")).toBeInTheDocument();
    expect(screen.getByText("Guardar Pago")).toBeInTheDocument();
  });

  it("muestra error si el submit falla", async () => {
    const mockOnSubmitFail = vi.fn().mockResolvedValue({ success: false, error: "Error al guardar pago" });
    render(
      <PaymentForm 
        mode="edit" 
        salesList={mockSalesList} 
        initialValues={{ venta_id: "123e4567-e89b-12d3-a456-426614174003", fecha_pago: "2026-07-15", monto_pagado: 100, metodo_pago: "Efectivo" }} 
        onSubmit={mockOnSubmitFail} 
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Guardar Pago" }));

    expect(await screen.findByText("Error al guardar pago")).toBeInTheDocument();
  });

  it("muestra error genérico si ocurre excepción", async () => {
    const mockOnSubmitThrow = vi.fn().mockRejectedValue(new Error("Error inesperado"));
    render(
      <PaymentForm 
        mode="edit" 
        salesList={mockSalesList} 
        initialValues={{ venta_id: "123e4567-e89b-12d3-a456-426614174003", fecha_pago: "2026-07-15", monto_pagado: 100, metodo_pago: "Efectivo" }} 
        onSubmit={mockOnSubmitThrow} 
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Guardar Pago" }));

    expect(await screen.findByText("Error inesperado")).toBeInTheDocument();
  });
});
