import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PackagesPage from "@/app/tour-packages/page";
import { PackageForm } from "./components/PackageForm";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { createPackage } from "./actions/createPackage";
import { updatePackage } from "./actions/updatePackage";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: vi.fn(), push: vi.fn() }),
  usePathname: () => "/tour-packages",
}));
vi.mock("next/link", () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

vi.mock("@/lib/supabaseAdmin", () => ({
  supabaseAdmin: {
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      order: vi.fn(),
    })),
  },
}));

vi.mock("@/lib/supabase", () => ({
  supabase: {
    auth: {
      signOut: vi.fn(),
      getUser: vi.fn().mockResolvedValue({ data: { user: null } }),
    },
  },
}));

vi.mock("./actions/createPackage", () => ({ createPackage: vi.fn() }));
vi.mock("./actions/updatePackage", () => ({ updatePackage: vi.fn() }));

describe("Flujo 3: Gestión de Paquetes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("permite ver el listado de paquetes", async () => {
    const mockPackages = [
      {
        id: "123e4567-e89b-12d3-a456-426614174000",
        nombre: "Paquete Integración",
        destino: "Cusco",
        descripcion: "Desc",
        duracion_dias: 5,
        duracion_noches: 4,
        precio: 1500,
        estado: "Activo",
      },
    ];
    (supabaseAdmin.from as any).mockReturnValue({
      select: () => ({
        order: vi.fn().mockResolvedValue({ data: mockPackages, error: null }),
      }),
    });

    const PageComponent = await PackagesPage();
    render(PageComponent);

    expect(screen.getByText("Paquete Integración")).toBeInTheDocument();
    expect(screen.getByText("Cusco")).toBeInTheDocument();
  });

  it("permite registrar un nuevo paquete interactuando con la Server Action", async () => {
    (createPackage as any).mockResolvedValue({ success: true });

    render(
      <PackageForm 
        mode="create" 
        initialValues={{
          nombre: "Nuevo Paquete",
          destino: "Arequipa",
          descripcion: "Test",
          duracion_dias: 3,
          duracion_noches: 2,
          precio: 500
        }} 
        onSubmit={createPackage as any} 
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Registrar Paquete" }));

    await waitFor(() => {
      expect(createPackage).toHaveBeenCalledWith(expect.objectContaining({
        nombre: "Nuevo Paquete",
        destino: "Arequipa",
        descripcion: "Test",
        precio: 500
      }));
    });
  });

  it("permite actualizar un paquete existente", async () => {
    (updatePackage as any).mockResolvedValue({ success: true });

    render(
      <PackageForm 
        mode="edit" 
        initialValues={{
          nombre: "Paquete Actualizado",
          destino: "Iquitos",
          descripcion: "Selva",
          duracion_dias: 4,
          duracion_noches: 3,
          precio: 800
        }} 
        onSubmit={updatePackage as any} 
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Actualizar Paquete" }));

    await waitFor(() => {
      expect(updatePackage).toHaveBeenCalledWith(expect.objectContaining({
        nombre: "Paquete Actualizado",
        destino: "Iquitos",
        descripcion: "Selva",
        precio: 800
      }));
    });
  });
});
