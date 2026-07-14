"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import {
  reservationSchema,
  ReservationFormValues,
} from "../schemas/reservationSchema";

interface ReservationFormProps {
  mode: "create" | "edit";
  clientsList: { id: string; nombre_completo: string }[];
  packagesList: { id: string; nombre: string; precio: number }[];
  initialValues?: {
    cliente_id: string;
    paquete_id: string;
    fecha_reserva: string;
    cantidad_personas: number;
    estado: "Pendiente" | "Confirmada" | "Cancelada";
  };
  onSubmit: (
    values: ReservationFormValues
  ) => Promise<{ success: boolean; error?: string }>;
}

export function ReservationForm({
  mode,
  clientsList,
  packagesList,
  initialValues,
  onSubmit,
}: ReservationFormProps) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      cliente_id: initialValues?.cliente_id || "",
      paquete_id: initialValues?.paquete_id || "",
      fecha_reserva: initialValues?.fecha_reserva || "",
      cantidad_personas: initialValues?.cantidad_personas || 1,
      estado: initialValues?.estado || "Pendiente",
    },
  });

  const handleFormSubmit = async (values: ReservationFormValues) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await onSubmit(values);
      if (!res.success) {
        setErrorMsg(res.error || "Ocurrió un error al procesar el formulario.");
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "Ocurrió un error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-xl mx-auto border-slate-200/60 shadow-md bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-zinc-950">
          {mode === "create"
            ? "Registrar Nueva Reserva"
            : "Editar Detalles de la Reserva"}
        </CardTitle>
        <CardDescription className="text-zinc-500">
          {mode === "create"
            ? "Ingrese los datos requeridos para registrar la reserva del paquete turístico."
            : "Actualice la información de la reserva según sea necesario."}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <CardContent className="space-y-4">
          {errorMsg && (
            <div className="p-3 text-sm rounded-lg bg-destructive/10 text-destructive border border-destructive/20">
              {errorMsg}
            </div>
          )}

          {/* Cliente */}
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-zinc-700 block"
              htmlFor="cliente_id"
            >
              Cliente
            </label>
            <Controller
              name="cliente_id"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={loading}
                >
                  <SelectTrigger className="border-slate-200 focus:ring-zinc-900 focus:border-zinc-900">
                    <SelectValue placeholder="Seleccione un cliente">
                      {clientsList.find((c) => c.id === field.value)?.nombre_completo}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-slate-200 shadow-md">
                    {clientsList.length === 0 ? (
                      <div className="p-2 text-sm text-zinc-500 text-center">
                        No hay clientes registrados
                      </div>
                    ) : (
                      clientsList.map((client) => (
                        <SelectItem
                          key={client.id}
                          value={client.id}
                          className="cursor-pointer hover:bg-slate-50 focus:bg-slate-50"
                        >
                          {client.nombre_completo}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.cliente_id?.message && (
              <p className="text-xs text-destructive">
                {errors.cliente_id.message}
              </p>
            )}
          </div>

          {/* Paquete Turístico */}
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-zinc-700 block"
              htmlFor="paquete_id"
            >
              Paquete Turístico
            </label>
            <Controller
              name="paquete_id"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={loading}
                >
                  <SelectTrigger className="border-slate-200 focus:ring-zinc-900 focus:border-zinc-900">
                    <SelectValue placeholder="Seleccione un paquete turístico">
                      {(() => {
                        const selectedPkg = packagesList.find((p) => p.id === field.value);
                        return selectedPkg ? `${selectedPkg.nombre} (S/. ${Number(selectedPkg.precio).toFixed(2)})` : undefined;
                      })()}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-slate-200 shadow-md">
                    {packagesList.length === 0 ? (
                      <div className="p-2 text-sm text-zinc-500 text-center">
                        No hay paquetes turísticos registrados
                      </div>
                    ) : (
                      packagesList.map((pkg) => (
                        <SelectItem
                          key={pkg.id}
                          value={pkg.id}
                          className="cursor-pointer hover:bg-slate-50 focus:bg-slate-50"
                        >
                          {pkg.nombre} (S/. {Number(pkg.precio).toFixed(2)})
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.paquete_id?.message && (
              <p className="text-xs text-destructive">
                {errors.paquete_id.message}
              </p>
            )}
          </div>

          {/* Fecha de Reserva */}
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-zinc-700 block"
              htmlFor="fecha_reserva"
            >
              Fecha de Reserva
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
                <Calendar className="w-4.5 h-4.5" />
              </span>
              <Input
                id="fecha_reserva"
                type="date"
                className="pl-10 border-slate-200 focus-visible:ring-zinc-900 focus-visible:border-zinc-900"
                disabled={loading}
                {...register("fecha_reserva")}
              />
            </div>
            {errors.fecha_reserva?.message && (
              <p className="text-xs text-destructive">
                {errors.fecha_reserva.message}
              </p>
            )}
          </div>

          {/* Cantidad de Personas */}
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-zinc-700 block"
              htmlFor="cantidad_personas"
            >
              Cantidad de Personas
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
                <Users className="w-4.5 h-4.5" />
              </span>
              <Input
                id="cantidad_personas"
                type="number"
                placeholder="2"
                className="pl-10 border-slate-200 focus-visible:ring-zinc-900 focus-visible:border-zinc-900"
                disabled={loading}
                {...register("cantidad_personas", { valueAsNumber: true })}
              />
            </div>
            {errors.cantidad_personas?.message && (
              <p className="text-xs text-destructive">
                {errors.cantidad_personas.message}
              </p>
            )}
          </div>

          {/* Estado de la Reserva */}
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-zinc-700 block"
              htmlFor="estado"
            >
              Estado de la Reserva
            </label>
            <Controller
              name="estado"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={loading}
                >
                  <SelectTrigger className="border-slate-200 focus:ring-zinc-900 focus:border-zinc-900">
                    <SelectValue placeholder="Seleccione un estado" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-slate-200 shadow-md">
                    <SelectItem
                      value="Pendiente"
                      className="cursor-pointer hover:bg-slate-50 focus:bg-slate-50"
                    >
                      Pendiente
                    </SelectItem>
                    <SelectItem
                      value="Confirmada"
                      className="cursor-pointer hover:bg-slate-50 focus:bg-slate-50"
                    >
                      Confirmada
                    </SelectItem>
                    <SelectItem
                      value="Cancelada"
                      className="cursor-pointer hover:bg-slate-50 focus:bg-slate-50"
                    >
                      Cancelada
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.estado?.message && (
              <p className="text-xs text-destructive">
                {errors.estado.message}
              </p>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between border-t border-slate-100 px-6 py-4">
          <Link href="/reservations">
            <Button
              type="button"
              variant="outline"
              className="border-slate-200 hover:bg-slate-50 text-zinc-700 cursor-pointer"
              disabled={loading}
            >
              Cancelar
            </Button>
          </Link>

          <Button
            type="submit"
            className="bg-zinc-900 hover:bg-zinc-800 text-white font-medium shadow-sm transition-all cursor-pointer"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-1.5">
                <Loader2 className="w-4 h-4 animate-spin" />
                Guardando...
              </span>
            ) : mode === "create" ? (
              "Registrar Reserva"
            ) : (
              "Actualizar Reserva"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
