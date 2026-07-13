"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Lock, Loader2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

// Define the validation schema using Zod
const loginSchema = z.object({
  email: z.string().min(1, "El correo es obligatorio").email("Formato de correo no válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    setErrorMsg(null);

    try {
      // 1. Authenticate with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (authError) {
        // Map common Supabase errors to user friendly messages
        if (authError.message === "Invalid login credentials") {
          throw new Error("Credenciales incorrectas");
        }
        throw new Error(authError.message);
      }

      const user = authData?.user;
      if (!user) {
        throw new Error("No se pudo iniciar sesión. Inténtelo de nuevo.");
      }

      // 2. Query the 'usuarios' table to check the active status and role (BR-003)
      const { data: dbUser, error: dbError } = await supabase
        .from("usuarios")
        .select("estado, email")
        .eq("id", user.id)
        .single();

      if (dbError || !dbUser) {
        // If not found in our system, sign them out immediately
        await supabase.auth.signOut();
        throw new Error("Usuario no registrado en el sistema");
      }

      if (dbUser.estado !== "Activo") {
        // If inactive (BR-003), sign them out immediately
        await supabase.auth.signOut();
        throw new Error("El usuario se encuentra inactivo. Contacte al administrador");
      }

      // Successful login - redirect to dashboard
      // Note: Supabase onAuthStateChange will automatically write the cookie
      // but let's give the browser a moment to store it or force router refresh
      router.refresh();
      router.push("/dashboard");
    } catch (err: any) {
      setErrorMsg(err.message || "Ha ocurrido un error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full border-zinc-200/50 shadow-xl backdrop-blur-md bg-white/95">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold tracking-tight text-center text-zinc-900">
          Iniciar Sesión
        </CardTitle>
        <CardDescription className="text-center text-zinc-500">
          Ingresa tus credenciales para acceder al sistema
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {errorMsg && (
            <div className="flex items-center gap-2 p-3 text-sm rounded-lg bg-destructive/10 text-destructive border border-destructive/20 animate-in fade-in zoom-in-95 duration-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 block" htmlFor="email">
              Correo Electrónico
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
                <Mail className="w-4 h-4" />
              </span>
              <Input
                id="email"
                type="email"
                placeholder="ejemplo@ayacuchotours.com"
                className="pl-10 h-11 border-zinc-200 focus-visible:ring-zinc-900 focus-visible:border-zinc-900"
                disabled={loading}
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-destructive animate-in fade-in duration-200">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 block" htmlFor="password">
              Contraseña
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
                <Lock className="w-4 h-4" />
              </span>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="pl-10 h-11 border-zinc-200 focus-visible:ring-zinc-900 focus-visible:border-zinc-900"
                disabled={loading}
                {...register("password")}
              />
            </div>
            {errors.password && (
              <p className="text-xs text-destructive animate-in fade-in duration-200">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-zinc-900 hover:bg-zinc-800 text-white font-medium transition-all shadow-md active:scale-[0.98]"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Validando...
              </span>
            ) : (
              "Ingresar"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
