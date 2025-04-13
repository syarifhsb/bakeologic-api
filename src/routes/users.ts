import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { PublicUserSchema } from "../modules/user/schema";
import { ResponseErrorSchema } from "../modules/common/schema";
import { prisma } from "../lib/prisma";

export const usersRoute = new OpenAPIHono();

const tags = ["users"];

// GET /users
usersRoute.openapi(
  createRoute({
    tags,
    summary: "Get all users",
    method: "get",
    path: "/",
    responses: {
      200: {
        description: "Successfully get all users",
        content: { "application/json": { schema: z.array(PublicUserSchema) } },
      },
      400: {
        description: "Failed to get all users",
        content: { "application/json": { schema: ResponseErrorSchema } },
      },
    },
  }),
  async (c) => {
    try {
      const users = await prisma.user.findMany({
        omit: {
          email: true,
          phoneNumber: true,
        },
      });
      return c.json(users, 200);
    } catch (error) {
      console.error(error);
      return c.json({ message: "Get all users failed", error }, 400);
    }
  }
);

// GET /users/:username
usersRoute.openapi(
  createRoute({
    tags,
    summary: "Get a user by username",
    method: "get",
    path: "/:username",
    request: { params: z.object({ username: z.string() }) },
    responses: {
      200: {
        description: "Successful operation",
        content: { "application/json": { schema: PublicUserSchema } },
      },
      400: {
        description: "Get a user by slug failed",
        content: { "application/json": { schema: ResponseErrorSchema } },
      },
      404: { description: "User not found" },
    },
  }),
  async (c) => {
    try {
      const { username } = c.req.valid("param");

      const user = await prisma.user.findUnique({
        where: { username },
      });
      if (!user) return c.notFound();

      return c.json(user, 200);
    } catch (error) {
      console.error(error);
      return c.json({ message: "Get a user by username failed", error }, 400);
    }
  }
);

// PATCH /users/:id

// DELETE /users/:id
