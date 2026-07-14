import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatsCharts } from "./StatsCharts";

describe("StatsCharts", () => {
  const defaultProps = {
    reservationsByState: { Pendiente: 5, Confirmada: 10, Cancelada: 2 },
    salesByMethod: { Efectivo: 8, Transferencia: 4, Tarjeta: 3 },
  };

  it("renderiza los títulos de ambos gráficos", () => {
    render(<StatsCharts {...defaultProps} />);

    expect(screen.getByText("Reservas por Estado")).toBeInTheDocument();
    expect(screen.getByText("Ventas por Método de Pago")).toBeInTheDocument();
  });

  it("muestra los estados de reserva con sus conteos", () => {
    render(<StatsCharts {...defaultProps} />);

    expect(screen.getByText("Confirmadas")).toBeInTheDocument();
    expect(screen.getByText("Pendientes")).toBeInTheDocument();
    expect(screen.getByText("Canceladas")).toBeInTheDocument();
    expect(screen.getByText("10 reservas")).toBeInTheDocument();
    expect(screen.getByText("5 reservas")).toBeInTheDocument();
    expect(screen.getByText("2 reservas")).toBeInTheDocument();
  });

  it("muestra los métodos de pago con sus conteos", () => {
    render(<StatsCharts {...defaultProps} />);

    expect(screen.getByText("Efectivo")).toBeInTheDocument();
    expect(screen.getByText("Transferencia")).toBeInTheDocument();
    expect(screen.getByText("Tarjeta")).toBeInTheDocument();
    expect(screen.getByText("8 ventas")).toBeInTheDocument();
    expect(screen.getByText("4 ventas")).toBeInTheDocument();
    expect(screen.getByText("3 ventas")).toBeInTheDocument();
  });

  it("muestra el total de reservas en la descripción", () => {
    render(<StatsCharts {...defaultProps} />);

    expect(
      screen.getByText(/total de 17 reservas/)
    ).toBeInTheDocument();
  });

  it("muestra el total de ventas en la descripción", () => {
    render(<StatsCharts {...defaultProps} />);

    expect(
      screen.getByText(/total de 15 ventas/)
    ).toBeInTheDocument();
  });

  it("maneja valores en cero sin errores", () => {
    render(
      <StatsCharts
        reservationsByState={{ Pendiente: 0, Confirmada: 0, Cancelada: 0 }}
        salesByMethod={{ Efectivo: 0, Transferencia: 0, Tarjeta: 0 }}
      />
    );

    expect(screen.getByText("Reservas por Estado")).toBeInTheDocument();
    expect(screen.getByText("Ventas por Método de Pago")).toBeInTheDocument();
  });
});
