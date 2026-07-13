"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Lock, Loader2, Shield } from "lucide-react";
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

const createSchema = z.object({
  email: z.string().min(1, "El correo es obligatorio").email("Formato de correo no válido"),
  contrasena: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  rol_id: z.string().min(1, "El rol es obligatorio"),
});

const editSchema = z.object({
  rol_id: z.string().min(1, "El rol es obligatorio"),
});

type CreateFormValues = z.infer<typeof createSchema>;
type EditFormValues = z.infer<typeof editSchema>;

interface UserFormProps {
  mode: "create" | "edit";
  initialValues?: {
    id?: string;
    email?: string;
    rol_id?: string;
  };
  roles: { id: string; nombre: string }[];
  onSubmit: (values: { email?: string; contrasena?: string; rol_id: string }) => Promise<{ success: boolean; error?: string }>;
}

export function UserForm({ mode, initialValues, roles, onSubmit }: UserFormProps) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const currentSchema = mode === "create" ? createSchema : editSchema;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<any>({
    resolver: zodResolver(currentSchema),
    defaultValues: {
      email: initialValues?.email || "",
      contrasena: "",
      rol_id: initialValues?.rol_id || "",
    },
  });

  const handleFormSubmit = async (values: any) => {
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
          {mode === "create" ? "Registrar Nuevo Usuario" : "Editar Rol de Usuario"}
        </CardTitle>
        <CardDescription className="text-zinc-500">
          {mode === "create"
            ? "Complete las credenciales y asigne un rol para dar acceso al sistema."
            : "Modifique el rol asignado al usuario en el sistema."}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <CardContent className="space-y-4">
          {errorMsg && (
            <div className="p-3 text-sm rounded-lg bg-destructive/10 text-destructive border border-destructive/20">
              {errorMsg}
            </div>
          )}

          {/* Email field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 block" htmlFor="email">
              Correo Electrónico
            </label>
            {mode === "create" ? (
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
                  <Mail className="w-4.5 h-4.5" />
                </span>
                <Input
                  id="email"
                  type="email"
                  placeholder="usuario@ayacuchotours.com"
                  className="pl-10 border-slate-200 focus-visible:ring-zinc-900 focus-visible:border-zinc-900"
                  disabled={loading}
                  {...register("email")}
                />
              </div>
            ) : (
              <Input
                id="email"
                type="email"
                className="bg-slate-50 border-slate-200 text-zinc-500 cursor-not-allowed"
                disabled
                value={initialValues?.email || ""}
              />
            )}
            {errors.email?.message && (
              <p className="text-xs text-destructive">{errors.email.message as string}</p>
            )}
          </div>

          {/* Password field - only on create */}
          {mode === "create" && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 block" htmlFor="contrasena">
                Contraseña Temporal
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
                  <Lock className="w-4.5 h-4.5" />
                </span>
                <Input
                  id="contrasena"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 border-slate-200 focus-visible:ring-zinc-900 focus-visible:border-zinc-900"
                  disabled={loading}
                  {...register("contrasena")}
                />
              </div>
              {errors.contrasena?.message && (
                <p className="text-xs text-destructive">{errors.contrasena.message as string}</p>
              )}
            </div>
          )}

          {/* Role field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 block" htmlFor="rol_id">
              Rol del Usuario
            </label>
            <Controller
              name="rol_id"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={loading}
                >
                  <SelectTrigger className="border-slate-200 focus:ring-zinc-900 focus:border-zinc-900">
                    <SelectValue placeholder="Seleccione un rol" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-slate-200 shadow-md">
                    {roles.map((role) => (
                      <SelectItem key={role.id} value={role.id} className="cursor-pointer hover:bg-slate-50 focus:bg-slate-50">
                        {role.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.rol_id?.message && (
              <p className="text-xs text-destructive">{errors.rol_id.message as string}</p>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between border-t border-slate-100 px-6 py-4">
          <Link href="/users">
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
              mode === "create" ? "Registrar Usuario" : "Actualizar Usuario"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
