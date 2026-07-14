"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, DollarSign, Calendar } from "lucide-react";
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
import { paymentSchema, PaymentFormValues } from "../schemas/paymentSchema";

interface PaymentFormProps {
  mode: "create" | "edit";
  salesList: {
    id: string;
    fecha_venta: string;
    monto_total: number;
    cliente_nombre: string;
    paquete_nombre: string;
  }[];
  initialValues?: {
    venta_id: string;
    fecha_pago: string;
    monto_pagado: number;
    metodo_pago: "Efectivo" | "Transferencia" | "Tarjeta";
  };
  onSubmit: (
    values: PaymentFormValues
  ) => Promise<{ success: boolean; error?: string }>;
}

export function PaymentForm({
  mode,
  salesList,
  initialValues,
  onSubmit,
}: PaymentFormProps) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      venta_id: initialValues?.venta_id || "",
      fecha_pago: initialValues?.fecha_pago || new Date().toISOString().split("T")[0],
      monto_pagado: initialValues?.monto_pagado || 0,
      metodo_pago: initialValues?.metodo_pago || "Efectivo",
    },
  });

  const handleFormSubmit = async (values: PaymentFormValues) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await onSubmit(values);
      if (!res.success) {
        setErrorMsg(res.error || "Ocurrió un error al guardar el pago.");
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "Ocurrió un error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  const getSaleLabel = (id: string) => {
    const s = salesList.find((sale) => sale.id === id);
    if (!s) return "Seleccione una venta";
    return `${s.cliente_nombre} - ${s.paquete_nombre} (Total: S/. ${Number(s.monto_total).toFixed(2)})`;
  };

  return (
    <Card className="w-full max-w-xl mx-auto border-slate-200/60 shadow-md bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-zinc-950">
          {mode === "create" ? "Registrar Nuevo Pago" : "Editar Detalles de Pago"}
        </CardTitle>
        <CardDescription className="text-zinc-500">
          {mode === "create"
            ? "Ingrese la información para registrar un pago asociado a una venta realizada."
            : "Actualice la información del pago seleccionado."}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <CardContent className="space-y-4">
          {errorMsg && (
            <div className="p-3 text-sm rounded-lg bg-destructive/10 text-destructive border border-destructive/20">
              {errorMsg}
            </div>
          )}

          {/* Venta */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 block" htmlFor="venta_id">
              Venta Asociada
            </label>
            <Controller
              name="venta_id"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={loading || mode === "edit"}
                >
                  <SelectTrigger className="border-slate-200 focus:ring-zinc-900 focus:border-zinc-900">
                    <SelectValue placeholder="Seleccione una venta">
                      {getSaleLabel(field.value)}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-slate-200 shadow-md">
                    {salesList.length === 0 ? (
                      <div className="p-2 text-sm text-zinc-500 text-center">
                        No hay ventas registradas
                      </div>
                    ) : (
                      salesList.map((sale) => (
                        <SelectItem
                          key={sale.id}
                          value={sale.id}
                          className="cursor-pointer hover:bg-slate-50 focus:bg-slate-50"
                        >
                          {sale.cliente_nombre} - {sale.paquete_nombre} (Total: S/. {Number(sale.monto_total).toFixed(2)})
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.venta_id && (
              <span className="text-xs text-destructive font-medium">{errors.venta_id.message}</span>
            )}
          </div>

          {/* Fecha de Pago */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 block" htmlFor="fecha_pago">
              Fecha de Pago
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                <Calendar className="h-4 w-4" />
              </span>
              <Input
                id="fecha_pago"
                type="date"
                className="pl-10 border-slate-200 focus-visible:ring-zinc-900 focus-visible:border-zinc-900"
                disabled={loading}
                {...register("fecha_pago")}
              />
            </div>
            {errors.fecha_pago && (
              <span className="text-xs text-destructive font-medium">{errors.fecha_pago.message}</span>
            )}
          </div>

          {/* Monto Pagado */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 block" htmlFor="monto_pagado">
              Monto Pagado (S/.)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                <DollarSign className="h-4 w-4" />
              </span>
              <Input
                id="monto_pagado"
                type="number"
                step="0.01"
                placeholder="0.00"
                className="pl-10 border-slate-200 focus-visible:ring-zinc-900 focus-visible:border-zinc-900"
                disabled={loading}
                {...register("monto_pagado", { valueAsNumber: true })}
              />
            </div>
            {errors.monto_pagado && (
              <span className="text-xs text-destructive font-medium">{errors.monto_pagado.message}</span>
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
          <Link href="/payments">
            <Button type="button" variant="outline" className="border-slate-200 text-zinc-700 hover:bg-slate-50">
              Cancelar
            </Button>
          </Link>
          <Button type="submit" disabled={loading} className="bg-zinc-900 text-white hover:bg-zinc-800">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Guardar Pago
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
