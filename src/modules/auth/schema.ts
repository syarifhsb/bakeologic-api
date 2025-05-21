import { z } from "zod";
import { UserSchema as GeneratedUserSchema } from "@/prisma/generated/zod";
import { PrivateUserSchema, PublicUserSchema } from "~/modules/user/schema";

export const UsernameSchema = z
  .string()
  .min(2, { message: "Username must be at least 2 characters long" });

export const PasswordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" });

export const UserSchema = PrivateUserSchema.extend({
  username: UsernameSchema,
  password: PasswordSchema,
});

export const RequestRegisterSchema = UserSchema.pick({
  username: true,
  email: true,
  phoneNumber: true,
  firstName: true,
  lastName: true,
}).extend({
  password: PasswordSchema,
});

export const RequestLoginSchema = UserSchema.pick({
  username: true,
  password: true,
});

export const ResponseLoginSuccessSchema = z.object({
  user: PublicUserSchema,
  token: z.string(),
});
