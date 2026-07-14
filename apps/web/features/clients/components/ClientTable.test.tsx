import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ClientTable } from "./ClientTable";
import type { ClientRow } from "../types/client";

// Mock next modules
vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: vi.fn() }),
}));
vi.mock("next/link", () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));
vi.mock("../actions/toggleClientStatus", () => ({
  toggleClientStatus: vi.fn().mockResolvedValue({ success: true }),
}));

const mockClients: ClientRow[] = [
  {
    id: "1",
    nombre_completo: "Juan Pérez",
    tipo_documento: "DNI",
    nro_documento: "12345678",
    email: "juan@test.com",
    telefono: "999888777",
    is_active: true,
    created_at: "2026-07-01",
    updated_at: "2026-07-01",
  },
  {
    id: "2",
    nombre_completo: "María López",
    tipo_documento: "Pasaporte",
    nro_documento: "AB123456",
    email: null,
    telefono: null,
    is_active: false,
    created_at: "2026-07-02",
    updated_at: "2026-07-02",
  },
];

describe("ClientTable", () => {
  it("renderiza la tabla con datos de clientes", () => {
    render(<ClientTable clients={mockClients} />);

    expect(screen.getByText("Juan Pérez")).toBeInTheDocument();
    expect(screen.getByText("María López")).toBeInTheDocument();
    expect(screen.getByText("12345678")).toBeInTheDocument();
  });

  it("muestra los encabezados de la tabla", () => {
    render(<ClientTable clients={mockClients} />);

    expect(screen.getByText("Nombre Completo")).toBeInTheDocument();
    expect(screen.getByText("Documento")).toBeInTheDocument();
    expect(screen.getByText("Correo Electrónico")).toBeInTheDocument();
    expect(screen.getByText("Teléfono")).toBeInTheDocument();
    expect(screen.getByText("Estado")).toBeInTheDocument();
  });

  it("muestra el badge Activo/Inactivo correctamente", () => {
    render(<ClientTable clients={mockClients} />);

    expect(screen.getByText("Activo")).toBeInTheDocument();
    expect(screen.getByText("Inactivo")).toBeInTheDocument();
  });

  it("muestra mensaje cuando no hay clientes", () => {
    render(<ClientTable clients={[]} />);

    expect(screen.getByText("No hay clientes registrados")).toBeInTheDocument();
  });

  it("filtra clientes por nombre al buscar", () => {
    render(<ClientTable clients={mockClients} />);

    const searchInput = screen.getByPlaceholderText(
      "Buscar por nombre o número de documento..."
    );
    fireEvent.change(searchInput, { target: { value: "Juan" } });

    expect(screen.getByText("Juan Pérez")).toBeInTheDocument();
    expect(screen.queryByText("María López")).not.toBeInTheDocument();
  });

  it("filtra clientes por número de documento", () => {
    render(<ClientTable clients={mockClients} />);

    const searchInput = screen.getByPlaceholderText(
      "Buscar por nombre o número de documento..."
    );
    fireEvent.change(searchInput, { target: { value: "AB123" } });

    expect(screen.getByText("María López")).toBeInTheDocument();
    expect(screen.queryByText("Juan Pérez")).not.toBeInTheDocument();
  });

  it("muestra mensaje cuando no hay resultados de búsqueda", () => {
    render(<ClientTable clients={mockClients} />);

    const searchInput = screen.getByPlaceholderText(
      "Buscar por nombre o número de documento..."
    );
    fireEvent.change(searchInput, { target: { value: "ZZZZZ" } });

    expect(
      screen.getByText("No se encontraron clientes que coincidan con la búsqueda.")
    ).toBeInTheDocument();
  });
});
