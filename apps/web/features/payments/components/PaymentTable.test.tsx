import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PaymentTable } from "./PaymentTable";
import type { PaymentRow } from "../types/payment";

vi.mock("next/link", () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

const mockPayments: PaymentRow[] = [
  {
    id: "pay-1",
    venta_id: "sale-1",
    fecha_pago: "2026-07-14",
    monto_pagado: 200,
    metodo_pago: "Efectivo",
    created_at: "2026-07-14",
    updated_at: "2026-07-14",
    ventas: {
      id: "sale-1",
      fecha_venta: "2026-07-10",
      monto_total: 500,
      reservas: {
        id: "res-1",
        clientes: { nombre_completo: "Juan Pérez" },
      },
    },
  },
  {
    id: "pay-2",
    venta_id: "sale-2",
    fecha_pago: "2026-07-13",
    monto_pagado: 800,
    metodo_pago: "Tarjeta",
    created_at: "2026-07-13",
    updated_at: "2026-07-13",
    ventas: {
      id: "sale-2",
      fecha_venta: "2026-07-12",
      monto_total: 800,
      reservas: {
        id: "res-2",
        clientes: { nombre_completo: "María López" },
      },
    },
  },
];

describe("PaymentTable", () => {
  it("renderiza la tabla con datos de pagos", () => {
    render(<PaymentTable payments={mockPayments} />);

    expect(screen.getByText("Juan Pérez")).toBeInTheDocument();
    expect(screen.getByText("S/. 200.00")).toBeInTheDocument();
    expect(screen.getByText("María López")).toBeInTheDocument();
    expect(screen.getByText("S/. 800.00")).toBeInTheDocument();
  });

  it("muestra los encabezados de la tabla", () => {
    render(<PaymentTable payments={mockPayments} />);

    expect(screen.getByText("Cliente")).toBeInTheDocument();
    expect(screen.getByText("ID Venta")).toBeInTheDocument();
    expect(screen.getByText("Fecha de Pago")).toBeInTheDocument();
    expect(screen.getByText("Monto Pagado")).toBeInTheDocument();
    expect(screen.getByText("Método de Pago")).toBeInTheDocument();
  });

  it("filtra pagos por nombre del cliente", () => {
    render(<PaymentTable payments={mockPayments} />);

    const searchInput = screen.getByPlaceholderText("Buscar por cliente o ID de venta...");
    fireEvent.change(searchInput, { target: { value: "Juan" } });

    expect(screen.getByText("Juan Pérez")).toBeInTheDocument();
    expect(screen.queryByText("María López")).not.toBeInTheDocument();
  });

  it("muestra mensaje cuando no hay resultados", () => {
    render(<PaymentTable payments={mockPayments} />);

    const searchInput = screen.getByPlaceholderText("Buscar por cliente o ID de venta...");
    fireEvent.change(searchInput, { target: { value: "ZZZZ" } });

    expect(screen.getByText("No se encontraron pagos.")).toBeInTheDocument();
  });

  it("muestra mensaje cuando la lista está vacía", () => {
    render(<PaymentTable payments={[]} />);

    expect(screen.getByText("No se encontraron pagos.")).toBeInTheDocument();
  });
});
