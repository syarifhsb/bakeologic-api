import { z } from "zod";

export const SeedCategorySchema = z.object({
  name: z.string(),
  slug: z.string(),
});
