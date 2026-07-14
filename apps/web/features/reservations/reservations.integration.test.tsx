import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ReservationForm } from "./components/ReservationForm";
import { createReservation } from "./actions/createReservation";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: vi.fn(), push: vi.fn() }),
}));
vi.mock("next/link", () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

vi.mock("./actions/createReservation", () => ({ createReservation: vi.fn() }));

describe("Flujo 4: Gestión de Reservas", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("permite registrar una reserva tras seleccionar cliente y paquete", async () => {
    (createReservation as any).mockResolvedValue({ success: true });

    const mockClients = [{ id: "123e4567-e89b-12d3-a456-426614174000", nombre_completo: "Cliente 1" }];
    const mockPackages = [{ id: "123e4567-e89b-12d3-a456-426614174001", nombre: "Paquete 1", precio: 100 }];

    render(
      <ReservationForm 
        mode="create" 
        clientsList={mockClients}
        packagesList={mockPackages}
        initialValues={{
          cliente_id: "123e4567-e89b-12d3-a456-426614174000",
          paquete_id: "123e4567-e89b-12d3-a456-426614174001",
          fecha_reserva: "2026-07-20",
          cantidad_personas: 3,
          estado: "Confirmada"
        }} 
        onSubmit={createReservation as any} 
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Registrar Reserva" }));

    await waitFor(() => {
      expect(createReservation).toHaveBeenCalledWith({
        cliente_id: "123e4567-e89b-12d3-a456-426614174000",
        paquete_id: "123e4567-e89b-12d3-a456-426614174001",
        fecha_reserva: "2026-07-20",
        cantidad_personas: 3,
        estado: "Confirmada"
      });
    });
  });
});
