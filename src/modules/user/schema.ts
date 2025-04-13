import { UserSchema as GeneratedUserSchema } from "../../../prisma/generated/zod";

export const PrivateUserSchema = GeneratedUserSchema;

export const PublicUserSchema = GeneratedUserSchema.omit({
  email: true,
  phoneNumber: true,
});
