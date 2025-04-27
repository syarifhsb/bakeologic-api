import { z } from "zod";
import {
  CartItemSchema as GeneratedCartItemSchema,
  CartSchema as GeneratedCartSchema,
} from "@/prisma/generated/zod";
import { ProductSchema } from "~/modules/product/schema";

export const PrivateCartItemSchema = GeneratedCartItemSchema.extend({
  product: ProductSchema,
});

export const PrivateCartSchema = GeneratedCartSchema.extend({
  items: z.array(PrivateCartItemSchema),
});

export const RequestPutCartItemsSchema = z.object({
  productId: z.string().nonempty(),
  quantity: z.number(), // Allow negative quantity for decrease items
});

export const RequestPatchCartItemSchema = z.object({
  cartItemId: z.string().nonempty(),
  quantity: z.number(), // Allow negative quantity for decrease items
});

export const RequestPatchCartItemsQuantitySchema = z.object({
  quantity: z.number().min(1),
});

export type PrivateCart = z.infer<typeof PrivateCartSchema>;
export type PrivateCartItem = z.infer<typeof PrivateCartItemSchema>;
