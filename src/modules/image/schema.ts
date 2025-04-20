import { z } from "zod";

import { ProductImageSchema as GeneratedProductImageSchema } from "@/prisma/generated/zod";

export const ProductImageSchema = GeneratedProductImageSchema.extend({
  url: z.string().url(),
});

export const CreateProductImageSchema = ProductImageSchema.omit({
  id: true,
  productId: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  altText: z.string().nonempty({ message: "Alt text is required" }),
});

export const SeedProductImageSchema = ProductImageSchema.omit({
  id: true,
  productId: true,
  createdAt: true,
  updatedAt: true,
});
