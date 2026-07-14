import * as z from "zod";

export const saleSchema = z.object({
  reserva_id: z
    .string({ message: "La reserva es obligatoria" })
    .uuid("Reserva inválida"),
  fecha_venta: z
    .string({ message: "La fecha de venta es obligatoria" })
    .min(1, "La fecha de venta es obligatoria"),
  monto_total: z
    .number({ message: "El monto total debe ser un número válido" })
    .positive("El monto total debe ser mayor que cero"),
  metodo_pago: z.enum(["Efectivo", "Transferencia", "Tarjeta"], {
    message: "El método de pago es obligatorio",
  }),
});

export type SaleFormValues = z.infer<typeof saleSchema>;
