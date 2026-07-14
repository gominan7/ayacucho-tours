"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit2, Search } from "lucide-react";
import Link from "next/link";
import { ReservationRow } from "../types/reservation";

interface ReservationTableProps {
  reservations: ReservationRow[];
}

export function ReservationTable({ reservations }: ReservationTableProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Search by client name or package name
  const filteredReservations = reservations.filter((res) => {
    const clientName = res.clientes?.nombre_completo?.toLowerCase() || "";
    const packageName = res.paquetes?.nombre?.toLowerCase() || "";
    const search = searchTerm.toLowerCase();
    return clientName.includes(search) || packageName.includes(search);
  });

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Confirmada":
        return "bg-emerald-50 text-emerald-700 border border-emerald-200/60";
      case "Cancelada":
        return "bg-rose-50 text-rose-700 border border-rose-200/60";
      default:
        return "bg-amber-50 text-amber-700 border border-amber-200/60";
    }
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full max-w-md">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
            <Search className="w-4 h-4" />
          </span>
          <Input
            placeholder="Buscar por cliente o paquete..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 border-slate-200 focus-visible:ring-zinc-900 focus-visible:border-zinc-900"
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="border border-slate-100 rounded-xl overflow-hidden bg-white shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/75 border-b border-slate-100">
              <TableRow>
                <TableHead className="font-semibold text-zinc-700 h-11">
                  Cliente
                </TableHead>
                <TableHead className="font-semibold text-zinc-700 h-11">
                  Paquete Turístico
                </TableHead>
                <TableHead className="font-semibold text-zinc-700 h-11">
                  Fecha
                </TableHead>
                <TableHead className="font-semibold text-zinc-700 h-11">
                  Pax
                </TableHead>
                <TableHead className="font-semibold text-zinc-700 h-11">
                  Total (PEN)
                </TableHead>
                <TableHead className="font-semibold text-zinc-700 h-11">
                  Estado
                </TableHead>
                <TableHead className="font-semibold text-zinc-700 h-11 text-right">
                  Acciones
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReservations.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center h-24 text-zinc-500 font-medium"
                  >
                    No se encontraron reservas.
                  </TableCell>
                </TableRow>
              ) : (
                filteredReservations.map((res) => {
                  const packagePrice = res.paquetes?.precio || 0;
                  const totalCost = res.cantidad_personas * packagePrice;

                  return (
                    <TableRow
                      key={res.id}
                      className="hover:bg-slate-50/50 border-b border-slate-100 transition-colors"
                    >
                      <TableCell className="font-medium text-zinc-900">
                        {res.clientes?.nombre_completo || "Cliente Desconocido"}
                      </TableCell>
                      <TableCell className="text-zinc-600">
                        {res.paquetes?.nombre || "Paquete Desconocido"}
                      </TableCell>
                      <TableCell className="text-zinc-500 whitespace-nowrap">
                        {new Date(res.fecha_reserva + "T00:00:00").toLocaleDateString(
                          "es-PE",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </TableCell>
                      <TableCell className="text-zinc-700 font-medium">
                        {res.cantidad_personas}
                      </TableCell>
                      <TableCell className="text-zinc-900 font-semibold">
                        S/. {totalCost.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold select-none ${getStatusStyles(
                            res.estado
                          )}`}
                        >
                          {res.estado}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Link href={`/reservations/${res.id}/edit`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-zinc-500 hover:text-zinc-900 hover:bg-slate-100 rounded-lg h-8 w-8 p-0 cursor-pointer"
                          >
                            <Edit2 className="w-4 h-4" />
                            <span className="sr-only">Editar</span>
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
