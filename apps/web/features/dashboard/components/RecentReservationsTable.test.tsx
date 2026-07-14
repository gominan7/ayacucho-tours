import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { RecentReservationsTable } from "./RecentReservationsTable";

describe("RecentReservationsTable", () => {
  const mockReservations = [
    {
      id: "1",
      fecha_reserva: "2026-07-10",
      cliente_nombre: "Juan Pérez",
      paquete_nombre: "Tour Ayacucho",
    },
    {
      id: "2",
      fecha_reserva: "2026-07-12",
      cliente_nombre: "María López",
      paquete_nombre: "Tour Huamanga",
    },
  ];

  it("renderiza el título de la tabla", () => {
    render(<RecentReservationsTable reservations={mockReservations} />);

    expect(screen.getByText(/Últimas Reservas/i)).toBeInTheDocument();
  });

  it("muestra los encabezados de columna", () => {
    render(<RecentReservationsTable reservations={mockReservations} />);

    expect(screen.getByText("Cliente")).toBeInTheDocument();
    expect(screen.getByText("Paquete Turístico")).toBeInTheDocument();
    expect(screen.getByText("Fecha Reserva")).toBeInTheDocument();
  });

  it("renderiza los datos de las reservas", () => {
    render(<RecentReservationsTable reservations={mockReservations} />);

    expect(screen.getByText("Juan Pérez")).toBeInTheDocument();
    expect(screen.getByText("Tour Ayacucho")).toBeInTheDocument();
    expect(screen.getByText("María López")).toBeInTheDocument();
    expect(screen.getByText("Tour Huamanga")).toBeInTheDocument();
  });

  it("muestra mensaje vacío cuando no hay reservas", () => {
    render(<RecentReservationsTable reservations={[]} />);

    expect(
      screen.getByText("No hay reservas registradas en el sistema.")
    ).toBeInTheDocument();
  });
});
