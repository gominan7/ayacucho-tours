"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";

interface RecentReservation {
  id: string;
  fecha_reserva: string;
  cliente_nombre: string;
  paquete_nombre: string;
}

interface RecentReservationsTableProps {
  reservations: RecentReservation[];
}

export function RecentReservationsTable({ reservations }: RecentReservationsTableProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("es-PE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        timeZone: "UTC",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <Card className="border-slate-100 shadow-sm bg-white rounded-2xl overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <CalendarDays className="w-5 h-5 text-zinc-500" />
          <CardTitle className="text-lg font-bold text-zinc-950">
            Últimas Reservas Registradas
          </CardTitle>
        </div>
        <CardDescription className="text-zinc-500 text-sm">
          Monitoreo en tiempo real de las 5 reservaciones más recientes del negocio.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        {reservations.length === 0 ? (
          <div className="text-center py-8 text-zinc-400 font-medium">
            No hay reservas registradas en el sistema.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-slate-100">
            <Table>
              <TableHeader className="bg-slate-50/70">
                <TableRow>
                  <TableHead className="font-semibold text-zinc-700">Cliente</TableHead>
                  <TableHead className="font-semibold text-zinc-700">Paquete Turístico</TableHead>
                  <TableHead className="font-semibold text-zinc-700 text-right">Fecha Reserva</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reservations.map((res) => (
                  <TableRow key={res.id} className="hover:bg-slate-50/50 transition-colors">
                    <TableCell className="font-medium text-zinc-900">
                      {res.cliente_nombre}
                    </TableCell>
                    <TableCell className="text-zinc-600 font-medium">
                      {res.paquete_nombre}
                    </TableCell>
                    <TableCell className="text-zinc-500 font-semibold text-right">
                      {formatDate(res.fecha_reserva)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
