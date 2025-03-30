import { z } from "zod";

import { SeedProductSchema } from "../product/schema";

export type SeedProduct = z.infer<typeof SeedProductSchema>;

export const seedDataProducts: SeedProduct[] = [
  {
    slug: "butter-croissant",
    name: "Butter Croissant",
    price: 2.5,
    categorySlug: "pastries",
    featured: true,
    stockQuantity: 15,
    images: [
      {
        url: "https://ucarecdn.com/702dc96c-5b05-45fd-878e-d6914f677929/-/preview/612x408/",
        altText: "Butter Croissant",
      },
    ],
  },
  {
    slug: "flan-nature",
    name: "Flan Nature",
    price: 3.25,
    categorySlug: "pastries",
    stockQuantity: 15,
    images: [
      {
        url: "https://ucarecdn.com/21cd6c76-7f7c-4b09-9346-76be1c7d0aca/-/preview/612x408/",
        altText: "Flan Nature",
      },
    ],
  },

  {
    slug: "pain-au-chocolat",
    name: "Pain au Chocolat",
    price: 2.75,
    categorySlug: "pastries",
    featured: true,
    stockQuantity: 15,
    images: [
      {
        url: "https://ucarecdn.com/fa94e535-9a0f-4248-8948-455ac571a9fc/-/preview/612x408/",
        altText: "Pain au Chocolat",
      },
    ],
  },
  {
    slug: "bakeologics-cappuccino",
    name: "Bakeologics Cappuccino",
    price: 4.5,
    categorySlug: "beverages",
    stockQuantity: 15,
    images: [
      {
        url: "https://ucarecdn.com/f1ae429c-3efc-464c-abcf-ab6b59a2c0e4/-/preview/612x408/",
        altText: "Café au Lait",
      },
    ],
  },
  {
    slug: "french-baguette",
    name: "French Baguette",
    price: 2.25,
    categorySlug: "breads",
    featured: true,
    stockQuantity: 15,
    images: [
      {
        url: "https://ucarecdn.com/70fb616c-88e2-4f1c-9436-e36371a8ab18/-/preview/612x408/",
        altText: "Baguette",
      },
    ],
  },
  {
    slug: "chicken-sandwich",
    name: "Chicken Sandwich",
    price: 8.95,
    categorySlug: "sandwiches",
    stockQuantity: 15,
    images: [
      {
        url: "https://ucarecdn.com/94f7b6dd-934d-4d40-996e-b8f9984f8dda/-/preview/612x408/",
        altText: "Chicken Sandwich",
      },
    ],
  },
];
