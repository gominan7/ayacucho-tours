import * as z from "zod";

export const paymentSchema = z.object({
  venta_id: z
    .string({ message: "La venta es obligatoria" })
    .uuid("Venta inválida"),
  fecha_pago: z
    .string({ message: "La fecha de pago es obligatoria" })
    .min(1, "La fecha de pago es obligatoria"),
  monto_pagado: z
    .number({ message: "El monto pagado debe ser un número válido" })
    .positive("El monto pagado debe ser mayor que cero"),
  metodo_pago: z.enum(["Efectivo", "Transferencia", "Tarjeta"], {
    message: "El método de pago es obligatorio",
  }),
});

export type PaymentFormValues = z.infer<typeof paymentSchema>;
