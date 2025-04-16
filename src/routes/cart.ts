import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { PublicUserSchema } from "../modules/user/schema";
import { ResponseErrorSchema } from "../modules/common/schema";
import { checkAuthorized } from "../modules/auth/middleware";
import {
  PrivateCartItemSchema,
  PrivateCartSchema,
  RequestPostCartItemsSchema,
} from "../modules/cart/schema";
import { prisma } from "../lib/prisma";

export const cartRoute = new OpenAPIHono();

const tags = ["cart"];

// GET /cart
cartRoute.openapi(
  createRoute({
    tags,
    summary: "Get authenticated user's cart",
    method: "get",
    path: "/",
    security: [{ bearerAuth: [] }],
    middleware: checkAuthorized,
    responses: {
      200: {
        description: "Successfully get authenticated user's cart",
        content: { "application/json": { schema: PrivateCartSchema } },
      },
      500: {
        description: "Failed to get authenticated user's cart",
        content: { "application/json": { schema: ResponseErrorSchema } },
      },
    },
  }),
  async (c) => {
    try {
      const user = c.get("user");

      const existingCart = await prisma.cart.findUnique({
        where: { userId: user.id },
        include: {
          items: { include: { product: { include: { images: true } } } },
        },
      });

      if (!existingCart) {
        const newCart = await prisma.cart.create({
          data: { userId: user.id },
          include: {
            items: { include: { product: { include: { images: true } } } },
          },
        });
        return c.json(newCart, 200);
      }

      return c.json(existingCart, 200);
    } catch (error) {
      console.error(error);
      return c.json(
        { message: "Failed to get authenticated user's cart", error },
        500
      );
    }
  }
);

// POST /cart/items
cartRoute.openapi(
  createRoute({
    tags,
    summary: "Add product to cart",
    method: "put",
    path: "/items",
    security: [{ bearerAuth: [] }],
    middleware: checkAuthorized,
    request: {
      body: {
        description: "Product and quantity",
        content: { "application/json": { schema: RequestPostCartItemsSchema } },
      },
    },
    responses: {
      200: {
        description: "Successfully add product to cart",
        content: { "application/json": { schema: PrivateCartItemSchema } },
      },
      404: {
        description: "Failed to add product to cart because cart not found",
      },
      500: {
        description: "Failed to add product to cart",
        content: { "application/json": { schema: ResponseErrorSchema } },
      },
    },
  }),
  async (c) => {
    try {
      const user = c.get("user");
      const body = c.req.valid("json");

      const product = await prisma.product.findUnique({
        where: { id: body.productId },
      });
      if (!product) {
        return c.json({ message: "Product not found" }, 404);
      }

      // TODO: Refactor to middleware
      const existingCart = await prisma.cart.findUnique({
        where: { userId: user.id },
        include: { items: { include: { product: true } } },
      });
      if (!existingCart) {
        return c.json({ message: "Cart not found" }, 404);
      }

      const existingCartItem = existingCart.items.find((item) => {
        return item.productId === body.productId;
      });

      if (!existingCartItem) {
        if (body.quantity <= 0) {
          return c.json({ message: "Quantity cannot be less than 0" }, 400);
        }

        const isQuantityLessEqualThanStock =
          body.quantity <= product.stockQuantity;

        if (!isQuantityLessEqualThanStock) {
          return c.json({ message: "Quantity is greater than stock" }, 400);
        }

        const newCartItem = await prisma.cartItem.create({
          data: {
            cartId: existingCart.id,
            productId: body.productId,
            quantity: body.quantity,
          },
          include: { product: { include: { images: true } } },
        });
        return c.json(newCartItem, 200);
      }

      const totalQuantity = existingCartItem.quantity + body.quantity;
      if (totalQuantity <= 0) {
        return c.json({ message: "Total quantity cannot be less than 0" }, 400);
      }

      const isTotalQuantityLessEqualThanStock =
        totalQuantity <= product.stockQuantity;
      if (!isTotalQuantityLessEqualThanStock) {
        return c.json({ message: "Total quantity is greater than stock" }, 400);
      }

      const updatedCartItem = await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: totalQuantity },
        include: { product: { include: { images: true } } },
      });

      return c.json(updatedCartItem, 200);
    } catch (error) {
      console.error(error);
      return c.json({ message: "Failed to add product to cart", error }, 500);
    }
  }
);
