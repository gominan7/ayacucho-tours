import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SaleForm } from "./components/SaleForm";
import { createSale } from "./actions/createSale";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: vi.fn(), push: vi.fn() }),
}));
vi.mock("next/link", () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

vi.mock("./actions/createSale", () => ({ createSale: vi.fn() }));

describe("Flujo 5: Gestión de Ventas", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("permite registrar una venta desde una reserva existente", async () => {
    (createSale as any).mockResolvedValue({ success: true });

    const mockReservations = [{
      id: "123e4567-e89b-12d3-a456-426614174002",
      fecha_reserva: "2026-07-15",
      clientes: { nombre_completo: "Cliente 1" },
      paquetes: { nombre: "Paquete 1", precio: 200 }
    }];

    render(
      <SaleForm 
        mode="create" 
        reservationsList={mockReservations}
        initialValues={{
          reserva_id: "123e4567-e89b-12d3-a456-426614174002",
          fecha_venta: "2026-07-16",
          monto_total: 200,
          metodo_pago: "Efectivo"
        }} 
        onSubmit={createSale as any} 
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Guardar Venta" }));

    await waitFor(() => {
      expect(createSale).toHaveBeenCalledWith({
        reserva_id: "123e4567-e89b-12d3-a456-426614174002",
        fecha_venta: "2026-07-16",
        monto_total: 200,
        metodo_pago: "Efectivo"
      });
    });
  });
});
