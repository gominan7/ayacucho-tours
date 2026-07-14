import * as z from "zod";

export const packageSchema = z.object({
  nombre: z
    .string()
    .min(1, "El nombre del paquete es obligatorio")
    .max(255, "El nombre no puede exceder los 255 caracteres"),
  destino: z
    .string()
    .min(1, "El destino es obligatorio")
    .max(255, "El destino no puede exceder los 255 caracteres"),
  descripcion: z
    .string()
    .optional()
    .or(z.literal(""))
    .nullable(),
  precio: z
    .number({ message: "El precio debe ser un número válido" })
    .positive("El precio debe ser mayor que cero"),
});

export type PackageFormValues = z.infer<typeof packageSchema>;
