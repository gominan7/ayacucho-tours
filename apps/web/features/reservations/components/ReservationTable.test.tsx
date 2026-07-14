import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ReservationTable } from "./ReservationTable";
import type { ReservationRow } from "../types/reservation";

vi.mock("next/link", () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

const mockReservations: ReservationRow[] = [
  {
    id: "res-1",
    cliente_id: "cli-1",
    paquete_id: "pkg-1",
    fecha_reserva: "2026-07-10",
    cantidad_personas: 3,
    estado: "Confirmada",
    created_at: "2026-07-10",
    updated_at: "2026-07-10",
    clientes: { nombre_completo: "Juan Pérez" },
    paquetes: { nombre: "Tour Ayacucho", precio: 250 },
  },
  {
    id: "res-2",
    cliente_id: "cli-2",
    paquete_id: "pkg-2",
    fecha_reserva: "2026-07-12",
    cantidad_personas: 2,
    estado: "Pendiente",
    created_at: "2026-07-12",
    updated_at: "2026-07-12",
    clientes: { nombre_completo: "María López" },
    paquetes: { nombre: "Tour Huamanga", precio: 180 },
  },
];

describe("ReservationTable", () => {
  it("renderiza la tabla con datos de reservas", () => {
    render(<ReservationTable reservations={mockReservations} />);

    expect(screen.getByText("Juan Pérez")).toBeInTheDocument();
    expect(screen.getByText("Tour Ayacucho")).toBeInTheDocument();
    expect(screen.getByText("Confirmada")).toBeInTheDocument();
    expect(screen.getByText("S/. 750.00")).toBeInTheDocument();
  });

  it("muestra los encabezados de la tabla", () => {
    render(<ReservationTable reservations={mockReservations} />);

    expect(screen.getByText("Cliente")).toBeInTheDocument();
    expect(screen.getByText("Paquete Turístico")).toBeInTheDocument();
    expect(screen.getByText("Fecha")).toBeInTheDocument();
    expect(screen.getByText("Pax")).toBeInTheDocument();
    expect(screen.getByText("Estado")).toBeInTheDocument();
  });

  it("filtra reservas por nombre del cliente", () => {
    render(<ReservationTable reservations={mockReservations} />);

    const searchInput = screen.getByPlaceholderText("Buscar por cliente o paquete...");
    fireEvent.change(searchInput, { target: { value: "María" } });

    expect(screen.getByText("María López")).toBeInTheDocument();
    expect(screen.queryByText("Juan Pérez")).not.toBeInTheDocument();
  });

  it("muestra mensaje cuando no hay resultados", () => {
    render(<ReservationTable reservations={mockReservations} />);

    const searchInput = screen.getByPlaceholderText("Buscar por cliente o paquete...");
    fireEvent.change(searchInput, { target: { value: "ZZZZ" } });

    expect(screen.getByText("No se encontraron reservas.")).toBeInTheDocument();
  });

  it("muestra mensaje cuando la lista está vacía", () => {
    render(<ReservationTable reservations={[]} />);

    expect(screen.getByText("No se encontraron reservas.")).toBeInTheDocument();
  });
});
