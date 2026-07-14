"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, User, FileText, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { clientSchema, ClientFormValues } from "../schemas/clientSchema";

interface ClientFormProps {
  mode: "create" | "edit";
  initialValues?: {
    nombre_completo: string;
    tipo_documento: string;
    nro_documento: string;
    email?: string | null;
    telefono?: string | null;
  };
  onSubmit: (values: ClientFormValues) => Promise<{ success: boolean; error?: string }>;
}

export function ClientForm({ mode, initialValues, onSubmit }: ClientFormProps) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      nombre_completo: initialValues?.nombre_completo || "",
      tipo_documento: initialValues?.tipo_documento || "",
      nro_documento: initialValues?.nro_documento || "",
      email: initialValues?.email || "",
      telefono: initialValues?.telefono || "",
    },
  });

  const handleFormSubmit = async (values: ClientFormValues) => {
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
          {mode === "create" ? "Registrar Nuevo Cliente" : "Editar Información del Cliente"}
        </CardTitle>
        <CardDescription className="text-zinc-500">
          {mode === "create"
            ? "Complete la información personal y de contacto del nuevo cliente."
            : "Modifique los datos del cliente según sea necesario."}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <CardContent className="space-y-4">
          {errorMsg && (
            <div className="p-3 text-sm rounded-lg bg-destructive/10 text-destructive border border-destructive/20">
              {errorMsg}
            </div>
          )}

          {/* Nombre Completo */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 block" htmlFor="nombre_completo">
              Nombre Completo
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
                <User className="w-4.5 h-4.5" />
              </span>
              <Input
                id="nombre_completo"
                placeholder="Juan Pérez Gómez"
                className="pl-10 border-slate-200 focus-visible:ring-zinc-900 focus-visible:border-zinc-900"
                disabled={loading}
                {...register("nombre_completo")}
              />
            </div>
            {errors.nombre_completo?.message && (
              <p className="text-xs text-destructive">{errors.nombre_completo.message}</p>
            )}
          </div>

          {/* Tipo de Documento */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 block" htmlFor="tipo_documento">
              Tipo de Documento
            </label>
            <Controller
              name="tipo_documento"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={loading}
                >
                  <SelectTrigger className="border-slate-200 focus:ring-zinc-900 focus:border-zinc-900">
                    <SelectValue placeholder="Seleccione tipo de documento" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-slate-200 shadow-md">
                    <SelectItem value="DNI" className="cursor-pointer hover:bg-slate-50 focus:bg-slate-50">DNI</SelectItem>
                    <SelectItem value="Pasaporte" className="cursor-pointer hover:bg-slate-50 focus:bg-slate-50">Pasaporte</SelectItem>
                    <SelectItem value="RUC" className="cursor-pointer hover:bg-slate-50 focus:bg-slate-50">RUC</SelectItem>
                    <SelectItem value="Carnet de Extranjería" className="cursor-pointer hover:bg-slate-50 focus:bg-slate-50">Carnet de Extranjería</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.tipo_documento?.message && (
              <p className="text-xs text-destructive">{errors.tipo_documento.message}</p>
            )}
          </div>

          {/* Número de Documento */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 block" htmlFor="nro_documento">
              Número de Documento
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
                <FileText className="w-4.5 h-4.5" />
              </span>
              <Input
                id="nro_documento"
                placeholder="45678901"
                className="pl-10 border-slate-200 focus-visible:ring-zinc-900 focus-visible:border-zinc-900"
                disabled={loading}
                {...register("nro_documento")}
              />
            </div>
            {errors.nro_documento?.message && (
              <p className="text-xs text-destructive">{errors.nro_documento.message}</p>
            )}
          </div>

          {/* Correo Electrónico */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 block" htmlFor="email">
              Correo Electrónico (Opcional)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
                <Mail className="w-4.5 h-4.5" />
              </span>
              <Input
                id="email"
                type="email"
                placeholder="ejemplo@correo.com"
                className="pl-10 border-slate-200 focus-visible:ring-zinc-900 focus-visible:border-zinc-900"
                disabled={loading}
                {...register("email")}
              />
            </div>
            {errors.email?.message && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* Teléfono */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 block" htmlFor="telefono">
              Teléfono (Opcional)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
                <Phone className="w-4.5 h-4.5" />
              </span>
              <Input
                id="telefono"
                placeholder="987654321"
                className="pl-10 border-slate-200 focus-visible:ring-zinc-900 focus-visible:border-zinc-900"
                disabled={loading}
                {...register("telefono")}
              />
            </div>
            {errors.telefono?.message && (
              <p className="text-xs text-destructive">{errors.telefono.message}</p>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between border-t border-slate-100 px-6 py-4">
          <Link href="/clients">
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
              mode === "create" ? "Registrar Cliente" : "Actualizar Cliente"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
