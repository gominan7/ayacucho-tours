import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import DashboardPage from "@/app/dashboard/page";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: vi.fn(), push: vi.fn() }),
  usePathname: () => "/dashboard",
}));
vi.mock("next/link", () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));
vi.mock("recharts", () => {
  const Original = vi.importActual("recharts");
  return {
    ...Original,
    ResponsiveContainer: ({ children }: any) => <div data-testid="recharts-responsive-container">{children}</div>,
    BarChart: () => <div data-testid="recharts-bar-chart" />,
    PieChart: () => <div data-testid="recharts-pie-chart" />,
    Bar: () => null,
    Pie: () => null,
    XAxis: () => null,
    YAxis: () => null,
    CartesianGrid: () => null,
    Tooltip: () => null,
    Legend: () => null,
    Cell: () => null,
  };
});

import { getDashboardStats } from "./actions/getDashboardStats";

vi.mock("./actions/getDashboardStats", () => ({
  getDashboardStats: vi.fn(),
}));

vi.mock("@/lib/supabase", () => ({
  supabase: {
    auth: {
      signOut: vi.fn(),
      getUser: vi.fn().mockResolvedValue({ data: { user: null } }),
    },
  },
}));

describe("Flujo 7: Dashboard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("permite cargar y visualizar el dashboard con KPIs, gráficos y últimas reservas", async () => {
    (getDashboardStats as any).mockResolvedValue({
      success: true,
      data: {
        kpis: {
          clients: 10,
          packages: 5,
          reservations: 20,
          sales: 15,
          payments: 12
        },
        reservationsByState: [],
        salesByMethod: [],
        recentReservations: [{
          id: "123e4567-e89b-12d3-a456-426614174005",
          fecha_reserva: "2026-07-14",
          cliente_nombre: "Cliente Reciente",
          paquete_nombre: "Paquete Dashboard"
        }]
      }
    });

    const PageComponent = await DashboardPage();
    render(PageComponent);

    // Verify Title
    expect(screen.getByText("Dashboard General")).toBeInTheDocument();

    // Verify some KPI titles
    expect(screen.getByText("Clientes")).toBeInTheDocument();
    expect(screen.getByText("Paquetes")).toBeInTheDocument();

    // Verify charts mocked title
    expect(screen.getByText("Reservas por Estado")).toBeInTheDocument();
    expect(screen.getByText("Ventas por Método de Pago")).toBeInTheDocument();

    // Verify recent reservations table data
    expect(screen.getByText(/Últimas Reservas/i)).toBeInTheDocument();
    expect(screen.getByText("Cliente Reciente")).toBeInTheDocument();
    expect(screen.getByText("Paquete Dashboard")).toBeInTheDocument();
  });
});
