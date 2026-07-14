"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Tag, MapPin, DollarSign, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { packageSchema, PackageFormValues } from "../schemas/packageSchema";

interface PackageFormProps {
  mode: "create" | "edit";
  initialValues?: {
    nombre: string;
    destino: string;
    descripcion?: string | null;
    precio: number;
  };
  onSubmit: (values: PackageFormValues) => Promise<{ success: boolean; error?: string }>;
}

export function PackageForm({ mode, initialValues, onSubmit }: PackageFormProps) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PackageFormValues>({
    resolver: zodResolver(packageSchema),
    defaultValues: {
      nombre: initialValues?.nombre || "",
      destino: initialValues?.destino || "",
      descripcion: initialValues?.descripcion || "",
      precio: initialValues?.precio || 0,
    },
  });

  const handleFormSubmit = async (values: PackageFormValues) => {
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
          {mode === "create" ? "Registrar Nuevo Paquete" : "Editar Información del Paquete"}
        </CardTitle>
        <CardDescription className="text-zinc-500">
          {mode === "create"
            ? "Complete los datos principales del nuevo paquete turístico."
            : "Modifique los detalles del paquete turístico según sea necesario."}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <CardContent className="space-y-4">
          {errorMsg && (
            <div className="p-3 text-sm rounded-lg bg-destructive/10 text-destructive border border-destructive/20">
              {errorMsg}
            </div>
          )}

          {/* Nombre */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 block" htmlFor="nombre">
              Nombre del Paquete
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
                <Tag className="w-4.5 h-4.5" />
              </span>
              <Input
                id="nombre"
                placeholder="Aventura en Ayacucho 3D/2N"
                className="pl-10 border-slate-200 focus-visible:ring-zinc-900 focus-visible:border-zinc-900"
                disabled={loading}
                {...register("nombre")}
              />
            </div>
            {errors.nombre?.message && (
              <p className="text-xs text-destructive">{errors.nombre.message}</p>
            )}
          </div>

          {/* Destino */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 block" htmlFor="destino">
              Destino
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
                <MapPin className="w-4.5 h-4.5" />
              </span>
              <Input
                id="destino"
                placeholder="Huancaraylla, Millpu"
                className="pl-10 border-slate-200 focus-visible:ring-zinc-900 focus-visible:border-zinc-900"
                disabled={loading}
                {...register("destino")}
              />
            </div>
            {errors.destino?.message && (
              <p className="text-xs text-destructive">{errors.destino.message}</p>
            )}
          </div>

          {/* Precio */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 block" htmlFor="precio">
              Precio (PEN)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
                <DollarSign className="w-4.5 h-4.5" />
              </span>
              <Input
                id="precio"
                type="number"
                step="0.01"
                placeholder="250.00"
                className="pl-10 border-slate-200 focus-visible:ring-zinc-900 focus-visible:border-zinc-900"
                disabled={loading}
                {...register("precio", { valueAsNumber: true })}
              />
            </div>
            {errors.precio?.message && (
              <p className="text-xs text-destructive">{errors.precio.message}</p>
            )}
          </div>

          {/* Descripción */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 block" htmlFor="descripcion">
              Descripción (Opcional)
            </label>
            <div className="relative">
              <span className="absolute top-3 left-3 text-zinc-400">
                <FileText className="w-4.5 h-4.5" />
              </span>
              <textarea
                id="descripcion"
                placeholder="Detalle el itinerario o lo que incluye el paquete..."
                className="flex min-h-[100px] w-full rounded-md border border-slate-200 bg-white pl-10 pr-3 py-2 text-sm shadow-sm placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900 focus-visible:border-zinc-900 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={loading}
                {...register("descripcion")}
              />
            </div>
            {errors.descripcion?.message && (
              <p className="text-xs text-destructive">{errors.descripcion.message}</p>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between border-t border-slate-100 px-6 py-4">
          <Link href="/tour-packages">
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
            ) : (
              mode === "create" ? "Registrar Paquete" : "Actualizar Paquete"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
