import { z } from "zod";

export const ResponseErrorSchema = z.object({
  message: z.string(),
  error: z.any(),
});
