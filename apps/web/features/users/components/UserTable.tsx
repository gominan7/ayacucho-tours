"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserRow } from "../types/user";
import { UserStatusBadge } from "./UserStatusBadge";
import { toggleUserStatus } from "../actions/toggleUserStatus";
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
import { MoreHorizontal, Edit, Power, UserPlus } from "lucide-react";

interface UserTableProps {
  users: UserRow[];
}

export function UserTable({ users }: UserTableProps) {
  const router = useRouter();
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleToggleStatus = async (userId: string) => {
    setTogglingId(userId);
    setError(null);
    try {
      const res = await toggleUserStatus(userId);
      if (!res.success) {
        setError(res.error || "Error al cambiar el estado del usuario.");
      } else {
        router.refresh();
      }
    } catch (err: any) {
      setError(err?.message || "Ocurrió un error inesperado.");
    } finally {
      setTogglingId(null);
    }
  };

  if (!users || users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center border border-dashed border-slate-200 rounded-xl p-12 text-center bg-white shadow-sm">
        <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mb-4">
          <UserPlus className="w-6 h-6" />
        </div>
        <h3 className="font-semibold text-zinc-900 text-lg">No hay usuarios registrados</h3>
        <p className="text-zinc-500 text-sm max-w-sm mt-1 mb-6">
          Comienza registrando al primer usuario del sistema asignándole un rol y credenciales de acceso.
        </p>
        <Link href="/users/new">
          <Button className="bg-zinc-900 hover:bg-zinc-800 text-white font-medium gap-2">
            <UserPlus className="w-4 h-4" />
            Registrar Usuario
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

      <div className="bg-white border border-slate-200/60 rounded-xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50/70 border-b border-slate-100">
            <TableRow>
              <TableHead className="font-semibold text-zinc-700 py-3.5 px-6">Correo Electrónico</TableHead>
              <TableHead className="font-semibold text-zinc-700 py-3.5 px-6">Rol</TableHead>
              <TableHead className="font-semibold text-zinc-700 py-3.5 px-6">Estado</TableHead>
              <TableHead className="font-semibold text-zinc-700 py-3.5 px-6 text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => {
              // Resolve role name
              const roleName =
                typeof user.roles === "object" && user.roles !== null
                  ? "nombre" in user.roles
                    ? user.roles.nombre
                    : ""
                  : "";

              return (
                <TableRow key={user.id} className="hover:bg-slate-50/50 transition-colors border-b border-slate-100 last:border-0">
                  <TableCell className="py-4 px-6 font-medium text-zinc-950">{user.email}</TableCell>
                  <TableCell className="py-4 px-6 text-zinc-600">{roleName || "Sin Rol"}</TableCell>
                  <TableCell className="py-4 px-6">
                    <UserStatusBadge estado={user.estado} />
                  </TableCell>
                  <TableCell className="py-4 px-6 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-zinc-500 hover:text-zinc-900 rounded-lg hover:bg-slate-100 cursor-pointer"
                            disabled={togglingId === user.id}
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
                              href={`/users/${user.id}/edit`}
                              className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-700 hover:text-zinc-950 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                            />
                          }
                        >
                          <Edit className="h-4 w-4 text-zinc-500" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleToggleStatus(user.id)}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-700 hover:text-zinc-950 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                        >
                          <Power className="h-4 w-4 text-zinc-500" />
                          {user.estado === "Activo" ? "Inactivar" : "Activar"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
