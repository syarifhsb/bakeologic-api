import { z } from "zod";
import { UserSchema as GeneratedUserSchema } from "@/prisma/generated/zod";
import { PublicUserSchema } from "~/modules/user/schema";

export const PasswordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" });

export const RequestRegisterSchema = GeneratedUserSchema.pick({
  username: true,
  email: true,
  phoneNumber: true,
  firstName: true,
  lastName: true,
}).extend({
  password: PasswordSchema,
});

export const RequestLoginSchema = GeneratedUserSchema.pick({
  username: true,
}).extend({
  password: PasswordSchema,
});

export const ResponseLoginSchema = z.object({
  user: PublicUserSchema,
  token: z.string(),
});
