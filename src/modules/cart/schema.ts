import { z } from "zod";
import {
  CartItemSchema as GeneratedCartItemSchema,
  CartSchema as GeneratedCartSchema,
} from "../../../prisma/generated/zod";
import { ProductSchema } from "../product/schema";

export const PrivateCartItemSchema = GeneratedCartItemSchema.extend({
  product: ProductSchema,
});

export const PrivateCartSchema = GeneratedCartSchema.extend({
  items: z.array(PrivateCartItemSchema),
});

export const RequestPostCartItemsSchema = z.object({
  productId: z.string(),
  quantity: z.number(), // Allow negative quantity for decrease items
});

export type PrivateCart = z.infer<typeof PrivateCartSchema>;
export type PrivateCartItem = z.infer<typeof PrivateCartItemSchema>;
