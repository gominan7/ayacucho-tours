import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SaleTable } from "./SaleTable";
import type { SaleRow } from "../types/sale";

vi.mock("next/link", () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

const mockSales: SaleRow[] = [
  {
    id: "sale-1",
    reserva_id: "res-1",
    fecha_venta: "2026-07-10",
    monto_total: 500,
    metodo_pago: "Efectivo",
    created_at: "2026-07-10",
    updated_at: "2026-07-10",
    reservas: {
      id: "res-1",
      fecha_reserva: "2026-07-08",
      clientes: { nombre_completo: "Juan Pérez" },
      paquetes: { nombre: "Tour Ayacucho" },
    },
  },
  {
    id: "sale-2",
    reserva_id: "res-2",
    fecha_venta: "2026-07-12",
    monto_total: 800,
    metodo_pago: "Tarjeta",
    created_at: "2026-07-12",
    updated_at: "2026-07-12",
    reservas: {
      id: "res-2",
      fecha_reserva: "2026-07-11",
      clientes: { nombre_completo: "María López" },
      paquetes: { nombre: "Tour Huamanga" },
    },
  },
];

describe("SaleTable", () => {
  it("renderiza la tabla con datos de ventas", () => {
    render(<SaleTable sales={mockSales} />);

    expect(screen.getByText("Juan Pérez")).toBeInTheDocument();
    expect(screen.getByText("Tour Ayacucho")).toBeInTheDocument();
    expect(screen.getByText("S/. 500.00")).toBeInTheDocument();
  });

  it("muestra los encabezados de la tabla", () => {
    render(<SaleTable sales={mockSales} />);

    expect(screen.getByText("Cliente")).toBeInTheDocument();
    expect(screen.getByText("Paquete Turístico")).toBeInTheDocument();
    expect(screen.getByText("Fecha de Venta")).toBeInTheDocument();
    expect(screen.getByText("Monto Total")).toBeInTheDocument();
    expect(screen.getByText("Método de Pago")).toBeInTheDocument();
  });

  it("filtra ventas por nombre del cliente", () => {
    render(<SaleTable sales={mockSales} />);

    const searchInput = screen.getByPlaceholderText("Buscar por cliente, paquete o ID...");
    fireEvent.change(searchInput, { target: { value: "María" } });

    expect(screen.getByText("María López")).toBeInTheDocument();
    expect(screen.queryByText("Juan Pérez")).not.toBeInTheDocument();
  });

  it("muestra mensaje cuando no hay resultados de búsqueda", () => {
    render(<SaleTable sales={mockSales} />);

    const searchInput = screen.getByPlaceholderText("Buscar por cliente, paquete o ID...");
    fireEvent.change(searchInput, { target: { value: "ZZZZ" } });

    expect(screen.getByText("No se encontraron ventas.")).toBeInTheDocument();
  });

  it("muestra mensaje cuando la lista está vacía", () => {
    render(<SaleTable sales={[]} />);

    expect(screen.getByText("No se encontraron ventas.")).toBeInTheDocument();
  });
});
