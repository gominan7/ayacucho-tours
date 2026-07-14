import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ClientsPage from "@/app/clients/page";
import { ClientForm } from "./components/ClientForm";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { createClient } from "./actions/createClient";
import { updateClient } from "./actions/updateClient";

// Mock next/navigation y next/link
vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: vi.fn(), push: vi.fn() }),
  usePathname: () => "/clients",
}));
vi.mock("next/link", () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

// Mock Supabase Admin
vi.mock("@/lib/supabaseAdmin", () => ({
  supabaseAdmin: {
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      order: vi.fn(),
    })),
  },
}));

// Mock Supabase for Navbar
vi.mock("@/lib/supabase", () => ({
  supabase: {
    auth: {
      signOut: vi.fn(),
      getUser: vi.fn().mockResolvedValue({ data: { user: null } }),
    },
  },
}));

// Mock Server Actions
vi.mock("./actions/createClient", () => ({ createClient: vi.fn() }));
vi.mock("./actions/updateClient", () => ({ updateClient: vi.fn() }));

describe("Flujo 2: Gestión de Clientes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("permite ver el listado de clientes", async () => {
    const mockClients = [
      {
        id: "123e4567-e89b-12d3-a456-426614174000",
        nombre_completo: "Cliente Integración",
        tipo_documento: "DNI",
        nro_documento: "87654321",
        email: "cliente@test.com",
        estado: "Activo",
      },
    ];
    (supabaseAdmin.from as any).mockReturnValue({
      select: () => ({
        order: vi.fn().mockResolvedValue({ data: mockClients, error: null }),
      }),
    });

    const PageComponent = await ClientsPage();
    render(PageComponent);

    expect(screen.getByText("Cliente Integración")).toBeInTheDocument();
    expect(screen.getByText("87654321")).toBeInTheDocument();
  });

  it("permite registrar un nuevo cliente interactuando con la Server Action", async () => {
    (createClient as any).mockResolvedValue({ success: true });

    // Pasamos initialValues para sortear la limitación de JSDOM con Radix Select y Zod
    render(
      <ClientForm 
        mode="create" 
        initialValues={{
          nombre_completo: "Nuevo Cliente",
          tipo_documento: "DNI",
          nro_documento: "11112222",
          email: "nuevo@test.com",
          telefono: "999888777"
        }} 
        onSubmit={createClient as any} 
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Registrar Cliente" }));

    await waitFor(() => {
      expect(createClient).toHaveBeenCalledWith({
        nombre_completo: "Nuevo Cliente",
        tipo_documento: "DNI",
        nro_documento: "11112222",
        email: "nuevo@test.com",
        telefono: "999888777"
      });
    });
  });

  it("permite actualizar un cliente existente", async () => {
    (updateClient as any).mockResolvedValue({ success: true });

    render(
      <ClientForm 
        mode="edit" 
        initialValues={{
          nombre_completo: "Cliente Actualizado",
          tipo_documento: "Pasaporte",
          nro_documento: "P87654321",
          email: "actualizado@test.com",
          telefono: "999000111"
        }} 
        onSubmit={updateClient as any} 
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Actualizar Cliente" }));

    await waitFor(() => {
      expect(updateClient).toHaveBeenCalledWith({
        nombre_completo: "Cliente Actualizado",
        tipo_documento: "Pasaporte",
        nro_documento: "P87654321",
        email: "actualizado@test.com",
        telefono: "999000111"
      });
    });
  });
});
