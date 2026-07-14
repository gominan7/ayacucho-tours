"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, DollarSign, Calendar, CreditCard } from "lucide-react";
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
import { saleSchema, SaleFormValues } from "../schemas/saleSchema";

interface SaleFormProps {
  mode: "create" | "edit";
  reservationsList: {
    id: string;
    fecha_reserva: string;
    clientes?: { nombre_completo: string } | null;
    paquetes?: { nombre: string; precio: number } | null;
  }[];
  initialValues?: {
    reserva_id: string;
    fecha_venta: string;
    monto_total: number;
    metodo_pago: "Efectivo" | "Transferencia" | "Tarjeta";
  };
  onSubmit: (
    values: SaleFormValues
  ) => Promise<{ success: boolean; error?: string }>;
}

export function SaleForm({
  mode,
  reservationsList,
  initialValues,
  onSubmit,
}: SaleFormProps) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SaleFormValues>({
    resolver: zodResolver(saleSchema),
    defaultValues: {
      reserva_id: initialValues?.reserva_id || "",
      fecha_venta: initialValues?.fecha_venta || new Date().toISOString().split("T")[0],
      monto_total: initialValues?.monto_total || 0,
      metodo_pago: initialValues?.metodo_pago || "Efectivo",
    },
  });

  const selectedReservaId = watch("reserva_id");

  // Auto-fill amount when reservation changes in create mode
  useEffect(() => {
    if (mode === "create" && selectedReservaId) {
      const selectedReserva = reservationsList.find((r) => r.id === selectedReservaId);
      if (selectedReserva?.paquetes?.precio) {
        setValue("monto_total", selectedReserva.paquetes.precio);
      }
    }
  }, [selectedReservaId, mode, reservationsList, setValue]);

  const handleFormSubmit = async (values: SaleFormValues) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await onSubmit(values);
      if (!res.success) {
        setErrorMsg(res.error || "Ocurrió un error al procesar la venta.");
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "Ocurrió un error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  const getReservaLabel = (id: string) => {
    const r = reservationsList.find((res) => res.id === id);
    if (!r) return "Seleccione una reserva";
    const clientName = r.clientes?.nombre_completo || "Cliente desconocido";
    const packageName = r.paquetes?.nombre || "Paquete desconocido";
    return `${clientName} - ${packageName} (${r.fecha_reserva})`;
  };

  return (
    <Card className="w-full max-w-xl mx-auto border-slate-200/60 shadow-md bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-zinc-950">
          {mode === "create" ? "Registrar Nueva Venta" : "Editar Detalles de Venta"}
        </CardTitle>
        <CardDescription className="text-zinc-500">
          {mode === "create"
            ? "Ingrese los detalles financieros para registrar la venta asociada a una reserva."
            : "Actualice la información de la venta seleccionada."}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <CardContent className="space-y-4">
          {errorMsg && (
            <div className="p-3 text-sm rounded-lg bg-destructive/10 text-destructive border border-destructive/20">
              {errorMsg}
            </div>
          )}

          {/* Reserva */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 block" htmlFor="reserva_id">
              Reserva Asociada
            </label>
            <Controller
              name="reserva_id"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={loading || mode === "edit"} // Disable selection on edit to maintain integrity
                >
                  <SelectTrigger className="border-slate-200 focus:ring-zinc-900 focus:border-zinc-900">
                    <SelectValue placeholder="Seleccione una reserva">
                      {getReservaLabel(field.value)}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-slate-200 shadow-md">
                    {reservationsList.length === 0 ? (
                      <div className="p-2 text-sm text-zinc-500 text-center">
                        No hay reservas disponibles
                      </div>
                    ) : (
                      reservationsList.map((reserva) => (
                        <SelectItem
                          key={reserva.id}
                          value={reserva.id}
                          className="cursor-pointer hover:bg-slate-50 focus:bg-slate-50"
                        >
                          {reserva.clientes?.nombre_completo || "Cliente desconocido"} -{" "}
                          {reserva.paquetes?.nombre || "Paquete sin nombre"} ({reserva.fecha_reserva})
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.reserva_id && (
              <span className="text-xs text-destructive font-medium">{errors.reserva_id.message}</span>
            )}
          </div>

          {/* Fecha de Venta */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 block animate-none" htmlFor="fecha_venta">
              Fecha de Venta
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                <Calendar className="h-4 w-4" />
              </span>
              <Input
                id="fecha_venta"
                type="date"
                className="pl-10 border-slate-200 focus-visible:ring-zinc-900 focus-visible:border-zinc-900"
                disabled={loading}
                {...register("fecha_venta")}
              />
            </div>
            {errors.fecha_venta && (
              <span className="text-xs text-destructive font-medium">{errors.fecha_venta.message}</span>
            )}
          </div>

          {/* Monto Total */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 block animate-none" htmlFor="monto_total">
              Monto Total (S/.)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                <DollarSign className="h-4 w-4" />
              </span>
              <Input
                id="monto_total"
                type="number"
                step="0.01"
                placeholder="0.00"
                className="pl-10 border-slate-200 focus-visible:ring-zinc-900 focus-visible:border-zinc-900"
                disabled={loading}
                {...register("monto_total", { valueAsNumber: true })}
              />
            </div>
            {errors.monto_total && (
              <span className="text-xs text-destructive font-medium">{errors.monto_total.message}</span>
            )}
          </div>

          {/* Método de Pago */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 block" htmlFor="metodo_pago">
              Método de Pago
            </label>
            <Controller
              name="metodo_pago"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value} disabled={loading}>
                  <SelectTrigger className="border-slate-200 focus:ring-zinc-900 focus:border-zinc-900">
                    <SelectValue placeholder="Seleccione método de pago" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-slate-200 shadow-md">
                    <SelectItem
                      value="Efectivo"
                      className="cursor-pointer hover:bg-slate-50 focus:bg-slate-50"
                    >
                      Efectivo
                    </SelectItem>
                    <SelectItem
                      value="Transferencia"
                      className="cursor-pointer hover:bg-slate-50 focus:bg-slate-50"
                    >
                      Transferencia
                    </SelectItem>
                    <SelectItem
                      value="Tarjeta"
                      className="cursor-pointer hover:bg-slate-50 focus:bg-slate-50"
                    >
                      Tarjeta
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.metodo_pago && (
              <span className="text-xs text-destructive font-medium">{errors.metodo_pago.message}</span>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-end gap-3 border-t border-slate-100 px-6 py-4 mt-6">
          <Link href="/sales">
            <Button type="button" variant="outline" className="border-slate-200 text-zinc-700 hover:bg-slate-50">
              Cancelar
            </Button>
          </Link>
          <Button type="submit" disabled={loading} className="bg-zinc-900 text-white hover:bg-zinc-800">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Guardar Venta
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
