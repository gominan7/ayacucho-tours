import * as z from "zod";

export const clientSchema = z.object({
  nombre_completo: z
    .string()
    .min(1, "El nombre completo es obligatorio")
    .max(255, "El nombre no puede exceder los 255 caracteres"),
  tipo_documento: z
    .string()
    .min(1, "El tipo de documento es obligatorio"),
  nro_documento: z
    .string()
    .min(1, "El número de documento es obligatorio")
    .max(50, "El número de documento no puede exceder los 50 caracteres"),
  email: z
    .string()
    .email("Formato de correo no válido")
    .optional()
    .or(z.literal(""))
    .nullable(),
  telefono: z
    .string()
    .max(50, "El teléfono no puede exceder los 50 caracteres")
    .optional()
    .or(z.literal(""))
    .nullable(),
});

export type ClientFormValues = z.infer<typeof clientSchema>;
