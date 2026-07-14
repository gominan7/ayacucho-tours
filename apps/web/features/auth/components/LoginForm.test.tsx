import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "./LoginForm";
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

describe("LoginForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza el formulario correctamente", () => {
    render(<LoginForm />);
    expect(screen.getByText("Iniciar Sesión")).toBeInTheDocument();
    expect(screen.getByLabelText("Correo Electrónico")).toBeInTheDocument();
    expect(screen.getByLabelText("Contraseña")).toBeInTheDocument();
  });

  it("muestra error si las credenciales de auth fallan", async () => {
    (supabase.auth.signInWithPassword as any).mockResolvedValue({
      data: null,
      error: { message: "Invalid login credentials" },
    });

    render(<LoginForm />);
    
    fireEvent.change(screen.getByLabelText("Correo Electrónico"), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Ingresar" }));

    await waitFor(() => {
      expect(screen.getByText("Credenciales incorrectas")).toBeInTheDocument();
    });
  });

  it("muestra error si el usuario no existe en la BD y cierra sesión", async () => {
    (supabase.auth.signInWithPassword as any).mockResolvedValue({
      data: { user: { id: "user-123" } },
      error: null,
    });

    // Mock query returning no user
    const mockSingle = vi.fn().mockResolvedValue({ data: null, error: { message: "Not found" } });
    (supabase.from as any).mockReturnValue({
      select: () => ({
        eq: () => ({
          single: mockSingle,
        }),
      }),
    });

    render(<LoginForm />);
    
    fireEvent.change(screen.getByLabelText("Correo Electrónico"), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Ingresar" }));

    await waitFor(() => {
      expect(screen.getByText("Usuario no registrado en el sistema")).toBeInTheDocument();
      expect(supabase.auth.signOut).toHaveBeenCalled();
    });
  });

  it("muestra error si el usuario está inactivo y cierra sesión", async () => {
    (supabase.auth.signInWithPassword as any).mockResolvedValue({
      data: { user: { id: "user-123" } },
      error: null,
    });

    // Mock query returning inactive user
    const mockSingle = vi.fn().mockResolvedValue({
      data: { estado: "Inactivo", email: "test@test.com" },
      error: null,
    });
    (supabase.from as any).mockReturnValue({
      select: () => ({
        eq: () => ({
          single: mockSingle,
        }),
      }),
    });

    render(<LoginForm />);
    
    fireEvent.change(screen.getByLabelText("Correo Electrónico"), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Ingresar" }));

    await waitFor(() => {
      expect(screen.getByText("El usuario se encuentra inactivo. Contacte al administrador")).toBeInTheDocument();
      expect(supabase.auth.signOut).toHaveBeenCalled();
    });
  });

  it("redirige al dashboard si el inicio de sesión es exitoso", async () => {
    (supabase.auth.signInWithPassword as any).mockResolvedValue({
      data: { user: { id: "user-123" } },
      error: null,
    });

    const mockSingle = vi.fn().mockResolvedValue({
      data: { estado: "Activo", email: "test@test.com" },
      error: null,
    });
    (supabase.from as any).mockReturnValue({
      select: () => ({
        eq: () => ({
          single: mockSingle,
        }),
      }),
    });

    render(<LoginForm />);
    
    fireEvent.change(screen.getByLabelText("Correo Electrónico"), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Ingresar" }));

    await waitFor(() => {
      expect(mockRefresh).toHaveBeenCalled();
      expect(mockPush).toHaveBeenCalledWith("/dashboard");
    });
  });
});
