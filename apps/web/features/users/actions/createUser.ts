"use server";

import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { CreateUserPayload } from "../types/user";
import { revalidatePath } from "next/cache";

export async function createUser(payload: CreateUserPayload) {
  try {
    // 1. Check if email already exists in database
    const { data: existingUser, error: checkError } = await supabaseAdmin
      .from("usuarios")
      .select("id")
      .eq("email", payload.email)
      .maybeSingle();

    if (checkError) {
      return { success: false, error: checkError.message };
    }

    if (existingUser) {
      return { success: false, error: "El correo electrónico ya está registrado en el sistema" };
    }

    // 2. Fetch the role name to store in app_metadata
    const { data: roleData, error: roleError } = await supabaseAdmin
      .from("roles")
      .select("nombre")
      .eq("id", payload.rol_id)
      .single();

    if (roleError || !roleData) {
      return { success: false, error: "El rol seleccionado no es válido." };
    }

    // 3. Create user in Supabase Auth via Admin API, setting role in app_metadata
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: payload.email,
      password: payload.contrasena,
      email_confirm: true,
      app_metadata: {
        role: roleData.nombre,
      },
    });

    if (authError) {
      if (
        authError.message.toLowerCase().includes("already exists") ||
        authError.message.toLowerCase().includes("already registered")
      ) {
        return { success: false, error: "El correo electrónico ya está registrado en el sistema" };
      }
      return { success: false, error: authError.message };
    }

    const authUser = authData.user;
    if (!authUser) {
      return { success: false, error: "Error al crear el usuario en Supabase Auth." };
    }

    // 4. Insert user record into "usuarios" table
    const { error: dbError } = await supabaseAdmin
      .from("usuarios")
      .insert({
        id: authUser.id,
        email: payload.email,
        rol_id: payload.rol_id,
        estado: "Activo",
      });

    if (dbError) {
      // Manual Rollback: delete the created auth user
      await supabaseAdmin.auth.admin.deleteUser(authUser.id);
      return { success: false, error: `Error al registrar usuario en la base de datos: ${dbError.message}` };
    }

    revalidatePath("/users");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error?.message || "Ocurrió un error inesperado." };
  }
}
