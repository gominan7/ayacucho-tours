import { describe, it, expect } from "vitest";
import { clientSchema } from "./clientSchema";

describe("clientSchema", () => {
  const validData = {
    nombre_completo: "Juan Pérez",
    tipo_documento: "DNI",
    nro_documento: "45678901",
    email: "juan@correo.com",
    telefono: "987654321",
  };

  it("acepta datos válidos completos", () => {
    const result = clientSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("acepta datos válidos sin campos opcionales", () => {
    const result = clientSchema.safeParse({
      nombre_completo: "María López",
      tipo_documento: "Pasaporte",
      nro_documento: "AB123456",
    });
    expect(result.success).toBe(true);
  });

  it("acepta email vacío como opcional", () => {
    const result = clientSchema.safeParse({
      ...validData,
      email: "",
    });
    expect(result.success).toBe(true);
  });

  it("acepta telefono vacío como opcional", () => {
    const result = clientSchema.safeParse({
      ...validData,
      telefono: "",
    });
    expect(result.success).toBe(true);
  });

  it("rechaza nombre_completo vacío", () => {
    const result = clientSchema.safeParse({
      ...validData,
      nombre_completo: "",
    });
    expect(result.success).toBe(false);
  });

  it("rechaza tipo_documento vacío", () => {
    const result = clientSchema.safeParse({
      ...validData,
      tipo_documento: "",
    });
    expect(result.success).toBe(false);
  });

  it("rechaza nro_documento vacío", () => {
    const result = clientSchema.safeParse({
      ...validData,
      nro_documento: "",
    });
    expect(result.success).toBe(false);
  });

  it("rechaza email con formato inválido", () => {
    const result = clientSchema.safeParse({
      ...validData,
      email: "correo-invalido",
    });
    expect(result.success).toBe(false);
  });

  it("rechaza nombre_completo que excede 255 caracteres", () => {
    const result = clientSchema.safeParse({
      ...validData,
      nombre_completo: "a".repeat(256),
    });
    expect(result.success).toBe(false);
  });

  it("rechaza nro_documento que excede 50 caracteres", () => {
    const result = clientSchema.safeParse({
      ...validData,
      nro_documento: "1".repeat(51),
    });
    expect(result.success).toBe(false);
  });

  it("rechaza telefono que excede 50 caracteres", () => {
    const result = clientSchema.safeParse({
      ...validData,
      telefono: "9".repeat(51),
    });
    expect(result.success).toBe(false);
  });
});
