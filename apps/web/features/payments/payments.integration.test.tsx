import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { PaymentForm } from "./components/PaymentForm";
import { createPayment } from "./actions/createPayment";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: vi.fn(), push: vi.fn() }),
}));
vi.mock("next/link", () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

vi.mock("./actions/createPayment", () => ({ createPayment: vi.fn() }));

describe("Flujo 6: Gestión de Pagos", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("permite registrar un pago desde una venta existente", async () => {
    (createPayment as any).mockResolvedValue({ success: true });

    const mockSales = [{
      id: "123e4567-e89b-12d3-a456-426614174003",
      fecha_venta: "2026-07-16",
      monto_total: 200,
      cliente_nombre: "Cliente 1",
      paquete_nombre: "Paquete 1"
    }];

    render(
      <PaymentForm 
        mode="create" 
        salesList={mockSales}
        initialValues={{
          venta_id: "123e4567-e89b-12d3-a456-426614174003",
          fecha_pago: "2026-07-17",
          monto_pagado: 100,
          metodo_pago: "Transferencia"
        }} 
        onSubmit={createPayment as any} 
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Guardar Pago" }));

    await waitFor(() => {
      expect(createPayment).toHaveBeenCalledWith({
        venta_id: "123e4567-e89b-12d3-a456-426614174003",
        fecha_pago: "2026-07-17",
        monto_pagado: 100,
        metodo_pago: "Transferencia"
      });
    });
  });
});
