import { describe, it, expect } from "vitest";
import { paymentSchema } from "./paymentSchema";

describe("paymentSchema", () => {
  const validUUID = "a1b2c3d4-e5f6-7890-abcd-ef1234567890";
  const validData = {
    venta_id: validUUID,
    fecha_pago: "2026-07-14",
    monto_pagado: 200.0,
    metodo_pago: "Efectivo" as const,
  };

  it("acepta datos válidos completos", () => {
    const result = paymentSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("acepta método de pago Transferencia", () => {
    const result = paymentSchema.safeParse({
      ...validData,
      metodo_pago: "Transferencia",
    });
    expect(result.success).toBe(true);
  });

  it("acepta método de pago Tarjeta", () => {
    const result = paymentSchema.safeParse({
      ...validData,
      metodo_pago: "Tarjeta",
    });
    expect(result.success).toBe(true);
  });

  it("rechaza venta_id no UUID", () => {
    const result = paymentSchema.safeParse({
      ...validData,
      venta_id: "no-uuid",
    });
    expect(result.success).toBe(false);
  });

  it("rechaza fecha_pago vacía", () => {
    const result = paymentSchema.safeParse({
      ...validData,
      fecha_pago: "",
    });
    expect(result.success).toBe(false);
  });

  it("rechaza monto_pagado cero (BR-019)", () => {
    const result = paymentSchema.safeParse({
      ...validData,
      monto_pagado: 0,
    });
    expect(result.success).toBe(false);
  });

  it("rechaza monto_pagado negativo (BR-019)", () => {
    const result = paymentSchema.safeParse({
      ...validData,
      monto_pagado: -50,
    });
    expect(result.success).toBe(false);
  });

  it("rechaza método de pago inválido", () => {
    const result = paymentSchema.safeParse({
      ...validData,
      metodo_pago: "Cheque",
    });
    expect(result.success).toBe(false);
  });

  it("rechaza datos sin campo obligatorio venta_id", () => {
    const { venta_id, ...sinVenta } = validData;
    const result = paymentSchema.safeParse(sinVenta);
    expect(result.success).toBe(false);
  });

  it("acepta monto_pagado con decimales", () => {
    const result = paymentSchema.safeParse({
      ...validData,
      monto_pagado: 150.75,
    });
    expect(result.success).toBe(true);
  });
});
