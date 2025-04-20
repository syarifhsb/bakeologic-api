import { z } from "zod";
import {
  ProductSchema as GeneratedProductSchema,
  CategorySchema as GeneratedCategorySchema,
  ProductImageSchema as GeneratedProductImageSchema,
} from "@/prisma/generated/zod";
import {
  CreateProductImageSchema,
  SeedProductImageSchema,
} from "~/modules/image/schema";
import { PriceSchema, UpsertPriceSchema } from "~/modules/common/schema";

export const ProductSchema = GeneratedProductSchema.extend({
  name: z.string().nonempty({ message: "Name is required" }),
  price: PriceSchema,
  category: GeneratedCategorySchema,
  images: z.array(GeneratedProductImageSchema),
});

export const CreateProductSchema = ProductSchema.omit({
  id: true,
  slug: true,
  category: true,
  categoryId: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  price: UpsertPriceSchema,
  images: z.array(CreateProductImageSchema),
  categorySlug: z.string(),
});

export const UpdateProductSchema = CreateProductSchema.extend({
  name: z.string().nonempty({ message: "Name is required" }).optional(),
  description: z.string().optional(),
  featured: z.boolean().optional(),
  stockQuantity: z.number().optional(),
  price: UpsertPriceSchema.optional(),
  images: z.array(CreateProductImageSchema).optional(),
  categorySlug: z.string().optional(),
});

export const SeedProductSchema = GeneratedProductSchema.omit({
  id: true,
  categoryId: true,
  createdAt: true,
  updatedAt: true,
  featured: true,
}).extend({
  featured: z.boolean().optional(),
  price: UpsertPriceSchema,
  images: z.array(SeedProductImageSchema),
  categorySlug: z.string(),
});
