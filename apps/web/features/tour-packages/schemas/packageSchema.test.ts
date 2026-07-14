import { describe, it, expect } from "vitest";
import { packageSchema } from "./packageSchema";

describe("packageSchema", () => {
  const validData = {
    nombre: "Tour Ayacucho Colonial",
    destino: "Ayacucho",
    descripcion: "Visita los templos históricos",
    precio: 250.0,
  };

  it("acepta datos válidos completos", () => {
    const result = packageSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("acepta datos sin descripcion (opcional)", () => {
    const result = packageSchema.safeParse({
      nombre: "Tour Básico",
      destino: "Huamanga",
      precio: 100,
    });
    expect(result.success).toBe(true);
  });

  it("acepta descripcion vacía", () => {
    const result = packageSchema.safeParse({
      ...validData,
      descripcion: "",
    });
    expect(result.success).toBe(true);
  });

  it("rechaza nombre vacío", () => {
    const result = packageSchema.safeParse({
      ...validData,
      nombre: "",
    });
    expect(result.success).toBe(false);
  });

  it("rechaza destino vacío", () => {
    const result = packageSchema.safeParse({
      ...validData,
      destino: "",
    });
    expect(result.success).toBe(false);
  });

  it("rechaza precio cero", () => {
    const result = packageSchema.safeParse({
      ...validData,
      precio: 0,
    });
    expect(result.success).toBe(false);
  });

  it("rechaza precio negativo", () => {
    const result = packageSchema.safeParse({
      ...validData,
      precio: -50,
    });
    expect(result.success).toBe(false);
  });

  it("rechaza precio no numérico", () => {
    const result = packageSchema.safeParse({
      ...validData,
      precio: "abc",
    });
    expect(result.success).toBe(false);
  });

  it("rechaza nombre que excede 255 caracteres", () => {
    const result = packageSchema.safeParse({
      ...validData,
      nombre: "a".repeat(256),
    });
    expect(result.success).toBe(false);
  });

  it("rechaza destino que excede 255 caracteres", () => {
    const result = packageSchema.safeParse({
      ...validData,
      destino: "d".repeat(256),
    });
    expect(result.success).toBe(false);
  });
});
