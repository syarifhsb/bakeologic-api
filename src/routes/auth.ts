import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { PrivateUserSchema, PublicUserSchema } from "~/modules/user/schema";
import { ResponseErrorSchema } from "~/modules/common/schema";
import { prisma } from "~/lib/prisma";
import {
  RequestLoginSchema,
  RequestRegisterSchema,
  ResponseLoginSuccessSchema,
} from "~/modules/auth/schema";
import { hashPassword, verifyPassword } from "~/lib/password";
import { signToken } from "~/lib/token";
import { checkAuthorized } from "~/modules/auth/middleware";

export const authRoute = new OpenAPIHono();

const tags = ["auth"];

// POST /auth/register
authRoute.openapi(
  createRoute({
    tags,
    summary: "Register new user",
    method: "post",
    path: "/register",
    request: {
      body: {
        description: "Register new user",
        content: { "application/json": { schema: RequestRegisterSchema } },
      },
    },
    responses: {
      200: {
        description: "Successfully registered new user",
        content: { "application/json": { schema: PublicUserSchema } },
      },
      500: {
        description: "Failed to register new user",
        content: { "application/json": { schema: ResponseErrorSchema } },
      },
    },
  }),
  async (c) => {
    try {
      const { password, ...body } = c.req.valid("json");

      const hash = await hashPassword(password);

      const newUser = await prisma.user.create({
        data: {
          ...body,
          avatarUrl: `https://api.dicebear.com/9.x/open-peeps/svg?seed=${body.username}`,
          password: { create: { hash } },
        },
        omit: { email: true, phoneNumber: true },
      });
      return c.json(newUser, 200);
    } catch (error) {
      console.error(error);
      return c.json({ message: "Failed to register new user", error }, 500);
    }
  }
);

// POST /auth/login
authRoute.openapi(
  createRoute({
    tags,
    summary: "Login user",
    method: "post",
    path: "/login",
    request: {
      body: {
        description: "Login user",
        content: { "application/json": { schema: RequestLoginSchema } },
      },
    },
    responses: {
      200: {
        description: "Successfully registered new user",
        content: {
          "application/json": { schema: ResponseLoginSuccessSchema },
        },
      },
      400: {
        description: "Failed to register new user",
        content: { "application/json": { schema: ResponseErrorSchema } },
      },
      500: {
        description: "Failed to register new user",
        content: { "application/json": { schema: ResponseErrorSchema } },
      },
    },
  }),
  async (c) => {
    try {
      const { password, ...body } = c.req.valid("json");

      const user = await prisma.user.findUnique({
        where: { username: body.username },
        include: { password: true },
        omit: { email: true, phoneNumber: true },
      });
      if (!user) {
        return c.json(
          { message: `Username "${body.username}" is not found` },
          400
        );
      }

      const hash = user.password?.hash;
      if (!hash) return c.json({ message: "User has no password" }, 400);

      const isVerified = await verifyPassword(hash, password);
      if (!isVerified) {
        return c.json({ message: "Sorry, password was incorrect." }, 400);
      }

      const { password: _, ...userWithoutPassword } = user;

      const token = await signToken(user.id);
      if (!token) {
        return c.json({ message: "Failed to login" }, 400);
      }

      c.header("Token", token);
      return c.json({ user: userWithoutPassword, token }, 200);
    } catch (error) {
      console.error(error);
      return c.json({ message: "Failed to register new user", error }, 500);
    }
  }
);

// GET /auth/me
authRoute.openapi(
  createRoute({
    tags,
    summary: "Check authenticated user",
    method: "get",
    path: "/me",
    security: [{ Bearer: [] }],
    middleware: checkAuthorized,
    responses: {
      200: {
        description: "Successfully check authenticated user",
        content: { "application/json": { schema: PrivateUserSchema } },
      },
      500: {
        description: "Failed to check authenticated user",
        content: { "application/json": { schema: ResponseErrorSchema } },
      },
    },
  }),
  async (c) => {
    try {
      const user = c.get("user");
      return c.json(user, 200);
    } catch (error) {
      console.error(error);
      return c.json({ message: "Failed to register new user", error }, 500);
    }
  }
);

// GET /auth/logout
authRoute.openapi(
  createRoute({
    tags,
    summary: "Log out user",
    method: "post",
    path: "/logout",
    security: [{ Bearer: [] }],
    middleware: checkAuthorized,
    responses: {
      200: {
        description: "Successfully logged out user",
        content: { "application/json": { schema: PublicUserSchema } },
      },
      500: {
        description: "Failed to log out user",
        content: { "application/json": { schema: ResponseErrorSchema } },
      },
    },
  }),
  async (c) => {
    try {
      const user = c.get("user");
      // NOTE: If there's a way to invalidate the token, do it here
      return c.json(user, 200);
    } catch (error) {
      console.error(error);
      return c.json({ message: "Failed to log out user", error }, 500);
    }
  }
);
