import { describe, it, expect } from "vitest";
import { reservationSchema } from "./reservationSchema";

describe("reservationSchema", () => {
  const validUUID = "a1b2c3d4-e5f6-7890-abcd-ef1234567890";
  const validData = {
    cliente_id: validUUID,
    paquete_id: validUUID,
    fecha_reserva: "2026-07-14",
    cantidad_personas: 3,
    estado: "Pendiente" as const,
  };

  it("acepta datos válidos completos", () => {
    const result = reservationSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("acepta estado Confirmada", () => {
    const result = reservationSchema.safeParse({
      ...validData,
      estado: "Confirmada",
    });
    expect(result.success).toBe(true);
  });

  it("acepta estado Cancelada", () => {
    const result = reservationSchema.safeParse({
      ...validData,
      estado: "Cancelada",
    });
    expect(result.success).toBe(true);
  });

  it("rechaza cliente_id no UUID", () => {
    const result = reservationSchema.safeParse({
      ...validData,
      cliente_id: "no-es-uuid",
    });
    expect(result.success).toBe(false);
  });

  it("rechaza paquete_id no UUID", () => {
    const result = reservationSchema.safeParse({
      ...validData,
      paquete_id: "invalido",
    });
    expect(result.success).toBe(false);
  });

  it("rechaza fecha_reserva vacía", () => {
    const result = reservationSchema.safeParse({
      ...validData,
      fecha_reserva: "",
    });
    expect(result.success).toBe(false);
  });

  it("rechaza cantidad_personas cero", () => {
    const result = reservationSchema.safeParse({
      ...validData,
      cantidad_personas: 0,
    });
    expect(result.success).toBe(false);
  });

  it("rechaza cantidad_personas negativa", () => {
    const result = reservationSchema.safeParse({
      ...validData,
      cantidad_personas: -1,
    });
    expect(result.success).toBe(false);
  });

  it("rechaza cantidad_personas decimal", () => {
    const result = reservationSchema.safeParse({
      ...validData,
      cantidad_personas: 2.5,
    });
    expect(result.success).toBe(false);
  });

  it("rechaza estado inválido", () => {
    const result = reservationSchema.safeParse({
      ...validData,
      estado: "Aprobada",
    });
    expect(result.success).toBe(false);
  });
});
