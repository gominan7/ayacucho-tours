import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PackageTable } from "./PackageTable";
import type { PackageRow } from "../types/package";

vi.mock("next/link", () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

const mockPackages: PackageRow[] = [
  {
    id: "pkg-1",
    nombre: "Tour Ayacucho Colonial",
    destino: "Ayacucho",
    descripcion: "Visita histórica",
    precio: 350,
    created_at: "2026-07-01",
    updated_at: "2026-07-01",
  },
  {
    id: "pkg-2",
    nombre: "Aventura en Millpu",
    destino: "Huancaraylla",
    descripcion: null,
    precio: 200,
    created_at: "2026-07-02",
    updated_at: "2026-07-02",
  },
];

describe("PackageTable", () => {
  it("renderiza la tabla con datos de paquetes", () => {
    render(<PackageTable packages={mockPackages} />);

    expect(screen.getByText("Tour Ayacucho Colonial")).toBeInTheDocument();
    expect(screen.getByText("Ayacucho")).toBeInTheDocument();
    expect(screen.getByText("S/ 350.00")).toBeInTheDocument();
  });

  it("muestra los encabezados de la tabla", () => {
    render(<PackageTable packages={mockPackages} />);

    expect(screen.getByText("Nombre del Paquete")).toBeInTheDocument();
    expect(screen.getByText("Destino")).toBeInTheDocument();
    expect(screen.getByText("Precio (PEN)")).toBeInTheDocument();
    expect(screen.getByText("Descripción")).toBeInTheDocument();
  });

  it("muestra mensaje cuando no hay paquetes", () => {
    render(<PackageTable packages={[]} />);

    expect(screen.getByText("No hay paquetes turísticos registrados")).toBeInTheDocument();
  });

  it("filtra paquetes por nombre", () => {
    render(<PackageTable packages={mockPackages} />);

    const searchInput = screen.getByPlaceholderText("Buscar por nombre o destino...");
    fireEvent.change(searchInput, { target: { value: "Millpu" } });

    expect(screen.getByText("Aventura en Millpu")).toBeInTheDocument();
    expect(screen.queryByText("Tour Ayacucho Colonial")).not.toBeInTheDocument();
  });

  it("muestra 'Sin descripción' cuando es null", () => {
    render(<PackageTable packages={mockPackages} />);

    expect(screen.getByText("Sin descripción")).toBeInTheDocument();
  });
});
