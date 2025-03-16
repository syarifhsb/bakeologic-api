import { z } from "zod";
import { ProductSchema as GeneratedProductSchema } from "../../../prisma/generated/zod";
import {
  CreateProductImageSchema,
  SeedProductImageSchema,
} from "../image/schema";
import { Prisma } from "@prisma/client";

export const PriceSchema = z
  .instanceof(Prisma.Decimal)
  .refine((value) => value.gte("0.01"));

export const ProductSchema = GeneratedProductSchema.extend({
  name: z.string().nonempty({ message: "Name is required" }),
  price: PriceSchema,
});

export const CreateProductSchema = ProductSchema.omit({
  id: true,
  slug: true,
  categoryId: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  price: z.number().refine((value) => value >= 0.01),
  images: z.array(CreateProductImageSchema),
  categorySlug: z.string(),
});

export const SeedProductSchema = z.object({
  name: z.string(),
  slug: z.string(),
  price: z.number().refine((value) => value >= 0.01),
  images: z.array(SeedProductImageSchema),
  categorySlug: z.string(),
});
