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
import { PaymentRow } from "../types/payment";

interface PaymentTableProps {
  payments: PaymentRow[];
}

export function PaymentTable({ payments }: PaymentTableProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPayments = payments.filter((payment) => {
    const clientName = payment.ventas?.reservas?.clientes?.nombre_completo?.toLowerCase() || "";
    const saleId = payment.venta_id.toLowerCase();
    const search = searchTerm.toLowerCase();
    return (
      clientName.includes(search) ||
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
            placeholder="Buscar por cliente o ID de venta..."
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
                  ID Venta
                </TableHead>
                <TableHead className="font-semibold text-zinc-700 h-11">
                  Fecha de Pago
                </TableHead>
                <TableHead className="font-semibold text-zinc-700 h-11">
                  Monto Pagado
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
              {filteredPayments.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center h-24 text-zinc-500 font-medium"
                  >
                    No se encontraron pagos.
                  </TableCell>
                </TableRow>
              ) : (
                filteredPayments.map((payment) => (
                  <TableRow
                    key={payment.id}
                    className="hover:bg-slate-50/50 border-b border-slate-100 transition-colors"
                  >
                    <TableCell className="font-medium text-zinc-900">
                      {payment.ventas?.reservas?.clientes?.nombre_completo || "Cliente Desconocido"}
                    </TableCell>
                    <TableCell className="text-zinc-600 font-mono text-xs max-w-[120px] truncate" title={payment.venta_id}>
                      {payment.venta_id}
                    </TableCell>
                    <TableCell className="text-zinc-500 whitespace-nowrap">
                      {new Date(payment.fecha_pago + "T00:00:00").toLocaleDateString(
                        "es-PE",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        }
                      )}
                    </TableCell>
                    <TableCell className="text-zinc-900 font-semibold">
                      S/. {Number(payment.monto_pagado).toFixed(2)}
                    </TableCell>
                    <TableCell className="text-zinc-700 font-medium">
                      {payment.metodo_pago}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={`/payments/${payment.id}/edit`}>
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
