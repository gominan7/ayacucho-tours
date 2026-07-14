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
import { SaleRow } from "../types/sale";

interface SaleTableProps {
  sales: SaleRow[];
}

export function SaleTable({ sales }: SaleTableProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSales = sales.filter((sale) => {
    const clientName = sale.reservas?.clientes?.nombre_completo?.toLowerCase() || "";
    const packageName = sale.reservas?.paquetes?.nombre?.toLowerCase() || "";
    const saleId = sale.id.toLowerCase();
    const search = searchTerm.toLowerCase();
    return (
      clientName.includes(search) ||
      packageName.includes(search) ||
      saleId.includes(search)
    );
  });

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full max-w-md">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
            <Search className="w-4 h-4" />
          </span>
          <Input
            placeholder="Buscar por cliente, paquete o ID..."
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
                  Fecha de Venta
                </TableHead>
                <TableHead className="font-semibold text-zinc-700 h-11">
                  Monto Total
                </TableHead>
                <TableHead className="font-semibold text-zinc-700 h-11">
                  Método de Pago
                </TableHead>
                <TableHead className="font-semibold text-zinc-700 h-11 text-right">
                  Acciones
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSales.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center h-24 text-zinc-500 font-medium"
                  >
                    No se encontraron ventas.
                  </TableCell>
                </TableRow>
              ) : (
                filteredSales.map((sale) => (
                  <TableRow
                    key={sale.id}
                    className="hover:bg-slate-50/50 border-b border-slate-100 transition-colors animate-none"
                  >
                    <TableCell className="font-medium text-zinc-900">
                      {sale.reservas?.clientes?.nombre_completo || "Cliente Desconocido"}
                    </TableCell>
                    <TableCell className="text-zinc-600">
                      {sale.reservas?.paquetes?.nombre || "Paquete Desconocido"}
                    </TableCell>
                    <TableCell className="text-zinc-500 whitespace-nowrap">
                      {new Date(sale.fecha_venta + "T00:00:00").toLocaleDateString(
                        "es-PE",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        }
                      )}
                    </TableCell>
                    <TableCell className="text-zinc-900 font-semibold">
                      S/. {Number(sale.monto_total).toFixed(2)}
                    </TableCell>
                    <TableCell className="text-zinc-700 font-medium">
                      {sale.metodo_pago}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={`/sales/${sale.id}/edit`}>
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
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
