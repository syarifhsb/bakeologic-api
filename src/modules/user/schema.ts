import { z } from "zod";
import { UserSchema as GeneratedUserSchema } from "@/prisma/generated/zod";

export const PhoneNumberSchema = z.string().regex(/^\+[1-9]\d{1,14}$/, {
  message: "Phone number is not valid. Please use the format +12345678901",
});

export const PrivateUserSchema = GeneratedUserSchema.extend({
  email: z.string().email(),
  phoneNumber: PhoneNumberSchema,
});

export const PublicUserSchema = PrivateUserSchema.omit({
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
