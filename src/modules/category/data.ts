import { z } from "zod";

import { SeedCategorySchema } from "../category/schema";

export type SeedCategory = z.infer<typeof SeedCategorySchema>;

export const seedDataCategories: SeedCategory[] = [
  { slug: "pastries", name: "Pastries" },
  { slug: "beverages", name: "Beverages" },
  { slug: "breads", name: "Breads" },
  { slug: "sandwiches", name: "Sandwiches" },
];
