"use client";

import { useState } from "react";
import Link from "next/link";
import { PackageRow } from "../types/package";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoreHorizontal, Edit, Compass, Search } from "lucide-react";

interface PackageTableProps {
  packages: PackageRow[];
}

export function PackageTable({ packages }: PackageTableProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter packages reactively based on name or destination
  const filteredPackages = packages.filter((pkg) => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return true;
    return (
      pkg.nombre.toLowerCase().includes(term) ||
      pkg.destino.toLowerCase().includes(term)
    );
  });

  if (!packages || packages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center border border-dashed border-slate-200 rounded-xl p-12 text-center bg-white shadow-sm">
        <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mb-4">
          <Compass className="w-6 h-6" />
        </div>
        <h3 className="font-semibold text-zinc-900 text-lg">No hay paquetes turísticos registrados</h3>
        <p className="text-zinc-500 text-sm max-w-sm mt-1 mb-6">
          Comienza registrando el primer paquete turístico de la agencia para poder ofertarlo en futuras reservas.
        </p>
        <Link href="/tour-packages/new">
          <Button className="bg-zinc-900 hover:bg-zinc-800 text-white font-medium gap-2 cursor-pointer">
            <Compass className="w-4 h-4" />
            Registrar Paquete
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Reactive Search Bar */}
      <div className="relative w-full max-w-md">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
          <Search className="w-4.5 h-4.5" />
        </span>
        <Input
          placeholder="Buscar por nombre o destino..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 border-slate-200 focus-visible:ring-zinc-900 focus-visible:border-zinc-900 bg-white"
        />
      </div>

      <div className="bg-white border border-slate-200/60 rounded-xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50/70 border-b border-slate-100">
            <TableRow>
              <TableHead className="font-semibold text-zinc-700 py-3.5 px-6">Nombre del Paquete</TableHead>
              <TableHead className="font-semibold text-zinc-700 py-3.5 px-6">Destino</TableHead>
              <TableHead className="font-semibold text-zinc-700 py-3.5 px-6">Precio (PEN)</TableHead>
              <TableHead className="font-semibold text-zinc-700 py-3.5 px-6">Descripción</TableHead>
              <TableHead className="font-semibold text-zinc-700 py-3.5 px-6 text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPackages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-zinc-500">
                  No se encontraron paquetes turísticos que coincidan con la búsqueda.
                </TableCell>
              </TableRow>
            ) : (
              filteredPackages.map((pkg) => (
                <TableRow key={pkg.id} className="hover:bg-slate-50/50 transition-colors border-b border-slate-100 last:border-0">
                  <TableCell className="py-4 px-6 font-medium text-zinc-950">
                    {pkg.nombre}
                  </TableCell>
                  <TableCell className="py-4 px-6 text-zinc-600">
                    {pkg.destino}
                  </TableCell>
                  <TableCell className="py-4 px-6 text-zinc-950 font-semibold">
                    S/ {Number(pkg.precio).toFixed(2)}
                  </TableCell>
                  <TableCell className="py-4 px-6 text-zinc-500 max-w-xs truncate">
                    {pkg.descripcion || <span className="text-zinc-400 italic">Sin descripción</span>}
                  </TableCell>
                  <TableCell className="py-4 px-6 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-zinc-500 hover:text-zinc-900 rounded-lg hover:bg-slate-100 cursor-pointer"
                          />
                        }
                      >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Menú de acciones</span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-32 border border-slate-200/80 bg-white/95 backdrop-blur-md shadow-lg p-1 rounded-xl">
                        <DropdownMenuItem
                          render={
                            <Link
                              href={`/tour-packages/${pkg.id}/edit`}
                              className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-700 hover:text-zinc-950 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                            />
                          }
                        >
                          <Edit className="h-4 w-4 text-zinc-500" />
                          Editar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
