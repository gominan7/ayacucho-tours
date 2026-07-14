import * as z from "zod";

export const reservationSchema = z.object({
  cliente_id: z
    .string({ message: "El cliente es obligatorio" })
    .uuid("Cliente inválido"),
  paquete_id: z
    .string({ message: "El paquete es obligatorio" })
    .uuid("Paquete inválido"),
  fecha_reserva: z
    .string({ message: "La fecha de reserva es obligatoria" })
    .min(1, "La fecha de reserva es obligatoria"),
  cantidad_personas: z
    .number({ message: "La cantidad de personas debe ser un número válido" })
    .int("Debe ser un número entero")
    .positive("La cantidad de personas debe ser mayor que cero"),
  estado: z.enum(["Pendiente", "Confirmada", "Cancelada"], {
    message: "El estado es obligatorio",
  }),
});

export type ReservationFormValues = z.infer<typeof reservationSchema>;
