import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { ProductSchema } from "../prisma/generated/zod";
import { ResponseErrorSchema } from "../modules/common/schema";

import { prisma } from "../lib/prisma";
import { convertSlug } from "../lib/slug";

export const productsRoute = new OpenAPIHono();

// GET /products
productsRoute.openapi(
  createRoute({
    tags: ["products"],
    summary: "Get all products",
    method: "get",
    path: "/",
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

// GET /products/:slug
productsRoute.openapi(
  createRoute({
    tags: ["products"],
    summary: "Get a product by slug",
    method: "get",
    path: "/:slug",
    request: { params: z.object({ slug: z.string() }) },
    responses: {
      404: { description: "Product not found" },
      400: {
        description: "Get a product by slug failed",
        content: { "application/json": { schema: ResponseErrorSchema } },
      },
      200: {
        description: "Successful operation",
        content: {
          "application/json": {
            schema: ProductSchema,
          },
        },
      },
    },
  }),
  async (c) => {
    try {
      const { slug } = c.req.valid("param");

      const product = await prisma.product.findUnique({
        where: { slug },
      });

      if (!product) {
        return c.notFound();
      }
      return c.json(product, 200);
    } catch (error) {
      console.error(error);
      return c.json({ message: "Get a product by slug failed", error }, 400);
    }
  }
);
