import { z } from "zod";
import { UserSchema as GeneratedUserSchema } from "@/prisma/generated/zod";

export const PrivateUserSchema = GeneratedUserSchema;

export const PublicUserSchema = GeneratedUserSchema.omit({
  email: true,
  phoneNumber: true,
});

export const PrivateUserUpdateSchema = PrivateUserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type PrivateUser = z.infer<typeof PrivateUserSchema>;
export type PublicUser = z.infer<typeof PublicUserSchema>;
