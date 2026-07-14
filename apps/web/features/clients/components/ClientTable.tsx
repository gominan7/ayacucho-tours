"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ClientRow } from "../types/client";
import { toggleClientStatus } from "../actions/toggleClientStatus";
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
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Edit, Power, UserPlus, Search } from "lucide-react";

interface ClientTableProps {
  clients: ClientRow[];
}

function ClientStatusBadge({ isActive }: { isActive: boolean }) {
  if (isActive) {
    return (
      <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 border shadow-sm">
        Activo
      </Badge>
    );
  }
  return (
    <Badge variant="destructive" className="border-destructive/20 border shadow-sm">
      Inactivo
    </Badge>
  );
}

export function ClientTable({ clients }: ClientTableProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleToggleStatus = async (clientId: string) => {
    setTogglingId(clientId);
    setError(null);
    try {
      const res = await toggleClientStatus(clientId);
      if (!res.success) {
        setError(res.error || "Error al cambiar el estado del cliente.");
      } else {
        router.refresh();
      }
    } catch (err: any) {
      setError(err?.message || "Ocurrió un error inesperado.");
    } finally {
      setTogglingId(null);
    }
  };

  // Filter clients reactively based on search term (name or document number)
  const filteredClients = clients.filter((client) => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return true;
    return (
      client.nombre_completo.toLowerCase().includes(term) ||
      client.nro_documento.toLowerCase().includes(term)
    );
  });

  if (!clients || clients.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center border border-dashed border-slate-200 rounded-xl p-12 text-center bg-white shadow-sm">
        <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mb-4">
          <UserPlus className="w-6 h-6" />
        </div>
        <h3 className="font-semibold text-zinc-900 text-lg">No hay clientes registrados</h3>
        <p className="text-zinc-500 text-sm max-w-sm mt-1 mb-6">
          Comienza registrando al primer cliente del sistema para poder asociarlo a reservas y ventas.
        </p>
        <Link href="/clients/new">
          <Button className="bg-zinc-900 hover:bg-zinc-800 text-white font-medium gap-2 cursor-pointer">
            <UserPlus className="w-4 h-4" />
            Registrar Cliente
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {error && (
        <div className="p-3 text-sm rounded-lg bg-destructive/10 text-destructive border border-destructive/20">
          {error}
        </div>
      )}

      {/* Reactive Search Bar */}
      <div className="relative w-full max-w-md">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
          <Search className="w-4.5 h-4.5" />
        </span>
        <Input
          placeholder="Buscar por nombre o número de documento..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 border-slate-200 focus-visible:ring-zinc-900 focus-visible:border-zinc-900 bg-white"
        />
      </div>

      <div className="bg-white border border-slate-200/60 rounded-xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50/70 border-b border-slate-100">
            <TableRow>
              <TableHead className="font-semibold text-zinc-700 py-3.5 px-6">Nombre Completo</TableHead>
              <TableHead className="font-semibold text-zinc-700 py-3.5 px-6">Documento</TableHead>
              <TableHead className="font-semibold text-zinc-700 py-3.5 px-6">Correo Electrónico</TableHead>
              <TableHead className="font-semibold text-zinc-700 py-3.5 px-6">Teléfono</TableHead>
              <TableHead className="font-semibold text-zinc-700 py-3.5 px-6">Estado</TableHead>
              <TableHead className="font-semibold text-zinc-700 py-3.5 px-6 text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-zinc-500">
                  No se encontraron clientes que coincidan con la búsqueda.
                </TableCell>
              </TableRow>
            ) : (
              filteredClients.map((client) => (
                <TableRow key={client.id} className="hover:bg-slate-50/50 transition-colors border-b border-slate-100 last:border-0">
                  <TableCell className="py-4 px-6 font-medium text-zinc-950">
                    {client.nombre_completo}
                  </TableCell>
                  <TableCell className="py-4 px-6 text-zinc-600">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 mr-2">
                      {client.tipo_documento}
                    </span>
                    {client.nro_documento}
                  </TableCell>
                  <TableCell className="py-4 px-6 text-zinc-600">
                    {client.email || <span className="text-zinc-400 italic">No especificado</span>}
                  </TableCell>
                  <TableCell className="py-4 px-6 text-zinc-600">
                    {client.telefono || <span className="text-zinc-400 italic">No especificado</span>}
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    <ClientStatusBadge isActive={client.is_active} />
                  </TableCell>
                  <TableCell className="py-4 px-6 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-zinc-500 hover:text-zinc-900 rounded-lg hover:bg-slate-100 cursor-pointer"
                            disabled={togglingId === client.id}
                          />
                        }
                      >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Menú de acciones</span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40 border border-slate-200/80 bg-white/95 backdrop-blur-md shadow-lg p-1 rounded-xl">
                        <DropdownMenuItem
                          render={
                            <Link
                              href={`/clients/${client.id}/edit`}
                              className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-700 hover:text-zinc-950 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                            />
                          }
                        >
                          <Edit className="h-4 w-4 text-zinc-500" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleToggleStatus(client.id)}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-700 hover:text-zinc-950 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                        >
                          <Power className="h-4 w-4 text-zinc-500" />
                          {client.is_active ? "Inactivar" : "Activar"}
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
