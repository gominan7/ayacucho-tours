import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "./components/LoginForm";
import { supabase } from "@/lib/supabase";

// Mock next/navigation
const mockPush = vi.fn();
const mockRefresh = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    refresh: mockRefresh,
  }),
}));

// Mock Supabase client
vi.mock("@/lib/supabase", () => ({
  supabase: {
    auth: {
      signInWithPassword: vi.fn(),
      signOut: vi.fn(),
    },
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn(),
    })),
  },
}));

describe("Flujo 1: Inicio de sesión → Dashboard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("permite a un usuario autenticarse y lo redirige al dashboard", async () => {
    // 1. Simular inicio de sesión exitoso en Supabase Auth
    (supabase.auth.signInWithPassword as any).mockResolvedValue({
      data: { user: { id: "user-123" } },
      error: null,
    });

    // 2. Simular que el usuario existe y está activo en la base de datos
    const mockSingle = vi.fn().mockResolvedValue({
      data: { estado: "Activo", email: "admin@test.com" },
      error: null,
    });
    (supabase.from as any).mockReturnValue({
      select: () => ({
        eq: () => ({
          single: mockSingle,
        }),
      }),
    });

    // 3. Renderizar el formulario de login
    render(<LoginForm />);
    
    // 4. Completar credenciales
    fireEvent.change(screen.getByLabelText("Correo Electrónico"), {
      target: { value: "admin@test.com" },
    });
    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: { value: "password123" },
    });
    
    // 5. Enviar el formulario
    fireEvent.click(screen.getByRole("button", { name: "Ingresar" }));

    // 6. Verificar validación y redirección
    await waitFor(() => {
      // Debería refrescar la sesión
      expect(mockRefresh).toHaveBeenCalled();
      // Debería redirigir al dashboard
      expect(mockPush).toHaveBeenCalledWith("/dashboard");
    });
  });
});
