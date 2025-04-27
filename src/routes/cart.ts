import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { prisma } from "~/lib/prisma";
import { checkAuthorized } from "~/modules/auth/middleware";
import {
  PrivateCartItemSchema,
  PrivateCartSchema,
  RequestPatchCartItemsQuantitySchema,
  RequestPutCartItemsSchema,
} from "~/modules/cart/schema";
import { ResponseErrorSchema } from "~/modules/common/schema";

export const cartRoute = new OpenAPIHono();

const tags = ["cart"];

// GET /cart
cartRoute.openapi(
  createRoute({
    tags,
    summary: "Get authenticated user's cart",
    method: "get",
    path: "/",
    security: [{ Bearer: [] }],
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
          items: {
            include: {
              product: { include: { images: true, category: true } },
            },
          },
        },
      });

      if (!existingCart) {
        const newCart = await prisma.cart.create({
          data: { userId: user.id },
          include: {
            items: {
              include: {
                product: { include: { images: true, category: true } },
              },
            },
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

// PUT /cart/items
cartRoute.openapi(
  createRoute({
    tags,
    summary: "Add product to cart",
    method: "put",
    path: "/items",
    security: [{ Bearer: [] }],
    middleware: checkAuthorized,
    request: {
      body: {
        description: "Product and quantity",
        content: { "application/json": { schema: RequestPutCartItemsSchema } },
      },
    },
    responses: {
      200: {
        description: "Successfully add product to cart",
        content: { "application/json": { schema: PrivateCartItemSchema } },
      },
      400: {
        description: "Failed to add product to cart because cart not found",
        content: { "application/json": { schema: ResponseErrorSchema } },
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
      if (!product) return c.json({ message: "Product not found" }, 400);

      // TODO: Refactor to middleware
      const existingCart = await prisma.cart.findUnique({
        where: { userId: user.id },
        include: { items: { include: { product: true } } },
      });
      if (!existingCart) {
        return c.json({ message: "Cart not found" }, 400);
      }

      const existingCartItem = existingCart.items.find((item) => {
        return item.productId === body.productId;
      });

      // IF NO CART ITEM = NEW PRODUCT TO ADD
      if (!existingCartItem) {
        if (body.quantity <= 0) {
          return c.json({ message: "Quantity cannot be less than 0" }, 400);
        }

        const isQuantityLessEqualThanStock =
          body.quantity <= product.stockQuantity;

        console.log({ existingCartItem, isQuantityLessEqualThanStock });

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

      // IF EXIST CART ITEM = EXISTING PRODUCT TO ADD

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

// DELETE /cart/items/:id
cartRoute.openapi(
  createRoute({
    tags,
    summary: "Remove product from cart",
    method: "delete",
    path: "/items/:id",
    security: [{ Bearer: [] }],
    middleware: checkAuthorized,
    request: { params: z.object({ id: z.string() }) },
    responses: {
      200: {
        description: "Successfully remove product from cart",
        content: { "application/json": { schema: PrivateCartItemSchema } },
      },
      404: {
        description:
          "Failed to remove product from cart because cart item not found",
      },
      500: {
        description: "Failed to remove product from cart",
        content: { "application/json": { schema: ResponseErrorSchema } },
      },
    },
  }),
  async (c) => {
    try {
      const user = c.get("user");
      const { id } = c.req.valid("param");

      const cartItem = await prisma.cartItem.delete({
        where: { id, cart: { userId: user.id } },
      });

      if (!cartItem) {
        return c.json({ message: "Cart item not found" }, 404);
      }

      return c.json(cartItem, 200);
    } catch (error) {
      console.error(error);
      return c.json(
        { message: "Failed to remove product from cart", error },
        500
      );
    }
  }
);

// PATCH /cart/items/:id
cartRoute.openapi(
  createRoute({
    tags,
    summary: "Update product quantity in cart",
    method: "patch",
    path: "/items/:id",
    security: [{ Bearer: [] }],
    middleware: checkAuthorized,
    request: {
      params: z.object({ id: z.string() }),
      body: {
        description: "Product quantity to update",
        content: {
          "application/json": { schema: RequestPatchCartItemsQuantitySchema },
        },
      },
    },
    responses: {
      200: {
        description: "Successfully update product quantity in cart",
        content: { "application/json": { schema: PrivateCartItemSchema } },
      },
      404: {
        description:
          "Failed to update product quantity in cart because cart item not found",
      },
      500: {
        description: "Failed to update product quantity in cart",
        content: { "application/json": { schema: ResponseErrorSchema } },
      },
    },
  }),
  async (c) => {
    try {
      const user = c.get("user");
      const { id } = c.req.valid("param");
      const body = c.req.valid("json");

      const cartItem = await prisma.cartItem.findUnique({
        where: { id, cart: { userId: user.id } },
      });

      if (!cartItem) {
        return c.json({ message: "Cart item not found" }, 404);
      }

      const { quantity } = body;

      const updatedCartItem = await prisma.cartItem.update({
        where: { id },
        data: { quantity },
        include: { product: true },
      });
      return c.json(updatedCartItem, 200);
    } catch (error) {
      console.error(error);
      return c.json(
        { message: "Failed to update product quantity in cart", error },
        500
      );
    }
  }
);
