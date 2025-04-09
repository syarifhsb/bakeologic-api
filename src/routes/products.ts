import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import {
  ProductSchema,
  CreateProductSchema,
  UpdateProductSchema,
} from "../modules/product/schema";
import { ResponseErrorSchema } from "../modules/common/schema";

import { prisma } from "../lib/prisma";
import { convertSlug } from "../lib/slug";

export const productsRoute = new OpenAPIHono();

const tags = ["products"];

// GET /products
productsRoute.openapi(
  createRoute({
    tags,
    summary: "Get all products",
    method: "get",
    path: "/",
    request: {
      query: z.object({
        category: z.string().optional(),
      }),
    },
    responses: {
      200: {
        description: "Successful operation",
        content: { "application/json": { schema: z.array(ProductSchema) } },
      },
      400: {
        description: "Get all products failed",
        content: { "application/json": { schema: ResponseErrorSchema } },
      },
    },
  }),
  async (c) => {
    try {
      const { category } = c.req.valid("query");

      const products = await prisma.product.findMany({
        where: category ? { category: { slug: category } } : undefined,
        include: {
          category: true,
          images: true,
        },
      });
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
    tags,
    summary: "Get a product by slug",
    method: "get",
    path: "/:slug",
    request: { params: z.object({ slug: z.string() }) },
    responses: {
      200: {
        description: "Successful operation",
        content: { "application/json": { schema: ProductSchema } },
      },
      400: {
        description: "Get a product by slug failed",
        content: { "application/json": { schema: ResponseErrorSchema } },
      },
      404: { description: "Product not found" },
    },
  }),
  async (c) => {
    try {
      const { slug } = c.req.valid("param");

      const product = await prisma.product.findUnique({
        where: { slug },
        include: {
          category: true,
          images: true,
        },
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

// POST /products
productsRoute.openapi(
  createRoute({
    tags,
    summary: "Add new product",
    method: "post",
    path: "/",
    request: {
      body: {
        description: "New product to add",
        content: { "application/json": { schema: CreateProductSchema } },
      },
    },
    responses: {
      201: {
        description: "New product added",
        content: { "application/json": { schema: ProductSchema } },
      },
      400: {
        description: "Add new product failed",
        content: { "application/json": { schema: ResponseErrorSchema } },
      },
    },
  }),
  async (c) => {
    const body = c.req.valid("json");

    const { categorySlug, ...productData } = body;

    try {
      const product = await prisma.product.create({
        data: {
          ...productData,
          slug: convertSlug(body.name),
          images: {
            connectOrCreate: body.images.map((image) => ({
              where: { url: image.url },
              create: { url: image.url, altText: image.altText },
            })),
          },
          category: { connect: { slug: body.categorySlug } },
        },
        include: {
          category: true,
          images: true,
        },
      });
      return c.json(product, 201);
    } catch (error) {
      console.error(error);
      return c.json({ message: "Add new product failed", error }, 400);
    }
  }
);

// PATCH /products/:slug
productsRoute.openapi(
  createRoute({
    tags,
    summary: "Update a product by slug",
    method: "patch",
    path: "/:slug",
    request: {
      params: z.object({ slug: z.string() }),
      body: {
        description: "Product to update",
        content: { "application/json": { schema: UpdateProductSchema } },
      },
    },
    responses: {
      200: {
        description: "Product updated",
        content: { "application/json": { schema: ProductSchema } },
      },
      400: {
        description: "Update a product failed",
        content: { "application/json": { schema: ResponseErrorSchema } },
      },
      404: { description: "Product not found" },
    },
  }),
  async (c) => {
    const body = c.req.valid("json");

    const { slug } = c.req.valid("param");

    const { categorySlug, images, ...productData } = body;

    try {
      const product = await prisma.product.update({
        where: { slug },
        data: {
          ...productData,
          images: {
            connectOrCreate: images
              ? images.map((image) => ({
                  where: { url: image.url },
                  create: { url: image.url, altText: image.altText },
                }))
              : undefined,
          },
          category: {
            connect: categorySlug ? { slug: categorySlug } : undefined,
          },
        },
        include: {
          category: true,
          images: true,
        },
      });
      return c.json(product, 200);
    } catch (error) {
      console.error(error);
      return c.json({ message: "Update a product failed", error }, 400);
    }
  }
);

// DELETE /products/:slug
productsRoute.openapi(
  createRoute({
    tags,
    summary: "Delete a product by slug",
    method: "delete",
    path: "/:slug",
    request: { params: z.object({ slug: z.string() }) },
    responses: {
      200: {
        description: "Product deleted",
        content: { "application/json": { schema: ProductSchema } },
      },
      400: {
        description: "Delete a product failed",
        content: { "application/json": { schema: ResponseErrorSchema } },
      },
    },
  }),
  async (c) => {
    const { slug } = c.req.valid("param");

    try {
      const product = await prisma.product.delete({
        where: { slug },
        include: {
          category: true,
          images: true,
        },
      });
      return c.json(product, 200);
    } catch (error) {
      console.error(error);
      return c.json({ message: "Delete a product failed", error }, 400);
    }
  }
);
