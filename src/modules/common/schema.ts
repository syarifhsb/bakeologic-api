import { Prisma } from "@prisma/client";
import { z } from "zod";

export const ResponseErrorSchema = z.object({
  message: z.string(),
  error: z.any(),
});

export const PriceSchema = z
  .union([z.string(), z.number(), z.instanceof(Prisma.Decimal)])
  .refine((value) => {
    if (typeof value === "number") {
      return value >= 0.01; // 1 cent
    }
    if (typeof value === "string") {
      const parsedValue = parseFloat(value);
      return !isNaN(parsedValue) && parsedValue >= 0.01; // 1 cent
    }
    if (value instanceof Prisma.Decimal) {
      return value.gte(new Prisma.Decimal(0.01)); // 1 cent
    }
    return false;
  });

export const UpsertPriceSchema = z.number().refine((value) => value >= 0.01);
