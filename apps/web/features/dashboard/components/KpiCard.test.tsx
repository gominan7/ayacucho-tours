import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { KpiCard } from "./KpiCard";

describe("KpiCard", () => {
  it("renderiza el título y valor correctamente", () => {
    render(
      <KpiCard title="Clientes" value={42} icon={<span data-testid="icon">📊</span>} />
    );

    expect(screen.getByText("Clientes")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("renderiza el ícono proporcionado", () => {
    render(
      <KpiCard title="Ventas" value={10} icon={<span data-testid="icon">💰</span>} />
    );

    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("renderiza la descripción cuando se proporciona", () => {
    render(
      <KpiCard
        title="Reservas"
        value={5}
        icon={<span>📅</span>}
        description="Total de reservas"
      />
    );

    expect(screen.getByText("Total de reservas")).toBeInTheDocument();
  });

  it("no renderiza la descripción cuando no se proporciona", () => {
    render(
      <KpiCard title="Pagos" value={3} icon={<span>💳</span>} />
    );

    expect(screen.queryByText("Total de reservas")).not.toBeInTheDocument();
  });

  it("formatea valores grandes con separador de miles", () => {
    render(
      <KpiCard title="Total" value={1500} icon={<span>📈</span>} />
    );

    expect(screen.getByText("1,500")).toBeInTheDocument();
  });
});
