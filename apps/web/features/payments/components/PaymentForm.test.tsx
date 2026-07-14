import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { PaymentForm } from "./PaymentForm";

vi.mock("next/link", () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

const mockSalesList = [
  {
    id: "sale-1",
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
          venta_id: "sale-1",
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
});
