import { z } from "zod";
import { ProductSchema as GeneratedProductSchema } from "../../prisma/generated/zod";

export const ProductSchema = GeneratedProductSchema;

export const SeedProductSchema = z.object({
  name: z.string(),
  slug: z.string(),
  price: z.number(),
  imageUrl: z.string(),
  category: z.string(),
});
