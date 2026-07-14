import { describe, it, expect } from "vitest";
import { saleSchema } from "./saleSchema";

describe("saleSchema", () => {
  const validUUID = "a1b2c3d4-e5f6-7890-abcd-ef1234567890";
  const validData = {
    reserva_id: validUUID,
    fecha_venta: "2026-07-14",
    monto_total: 500.0,
    metodo_pago: "Efectivo" as const,
  };

  it("acepta datos válidos completos", () => {
    const result = saleSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("acepta método de pago Transferencia", () => {
    const result = saleSchema.safeParse({
      ...validData,
      metodo_pago: "Transferencia",
    });
    expect(result.success).toBe(true);
  });

  it("acepta método de pago Tarjeta", () => {
    const result = saleSchema.safeParse({
      ...validData,
      metodo_pago: "Tarjeta",
    });
    expect(result.success).toBe(true);
  });

  it("rechaza reserva_id no UUID", () => {
    const result = saleSchema.safeParse({
      ...validData,
      reserva_id: "no-uuid",
    });
    expect(result.success).toBe(false);
  });

  it("rechaza fecha_venta vacía", () => {
    const result = saleSchema.safeParse({
      ...validData,
      fecha_venta: "",
    });
    expect(result.success).toBe(false);
  });

  it("rechaza monto_total cero", () => {
    const result = saleSchema.safeParse({
      ...validData,
      monto_total: 0,
    });
    expect(result.success).toBe(false);
  });

  it("rechaza monto_total negativo", () => {
    const result = saleSchema.safeParse({
      ...validData,
      monto_total: -100,
    });
    expect(result.success).toBe(false);
  });

  it("rechaza método de pago inválido", () => {
    const result = saleSchema.safeParse({
      ...validData,
      metodo_pago: "Bitcoin",
    });
    expect(result.success).toBe(false);
  });

  it("rechaza datos sin campo obligatorio reserva_id", () => {
    const { reserva_id, ...sinReserva } = validData;
    const result = saleSchema.safeParse(sinReserva);
    expect(result.success).toBe(false);
  });
});
