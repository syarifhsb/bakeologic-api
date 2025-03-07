import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { ProductSchema } from "../prisma/generated/zod";
import { ResponseErrorSchema } from "../modules/common/schema";

import { prisma } from "../lib/prisma";

export const productsRoute = new OpenAPIHono();

// GET /products
productsRoute.openapi(
  createRoute({
    tags: ["products"],
    summary: "Get all products",
    method: "get",
    path: "/products",
    responses: {
      200: {
        description: "Successful operation",
        content: {
          "application/json": {
            schema: z.array(ProductSchema),
          },
        },
      },
      400: {
        description: "Get all products failed",
        content: { "application/json": { schema: ResponseErrorSchema } },
      },
    },
  }),
  async (c) => {
    try {
      const products = await prisma.product.findMany();
      return c.json(products, 200);
    } catch (error) {
      console.error(error);
      return c.json({ message: "Get all products failed", error }, 400);
    }
  }
);

// GET /products/:id
