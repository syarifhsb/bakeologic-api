import { z } from "zod";
import { SeedProductSchema } from "./schema";

export type SeedProduct = z.infer<typeof SeedProductSchema>;
export const seedDataProducts: SeedProduct[] = [
  {
    name: "Croissant",
    slug: "croissant",
    price: 10,
    imageUrl: "https://i.imgur.com/2w8v4lR.jpg",
    category: "Pastries",
  },
  {
    name: "Flan Nature",
    slug: "flan-nature",
    price: 10,
    imageUrl: "https://i.imgur.com/2w8v4lR.jpg",
    category: "Pastries",
  },

  {
    name: "Pain au Chocolat",
    slug: "pain-au-chocolat",
    price: 10,
    imageUrl: "https://i.imgur.com/2w8v4lR.jpg",
    category: "Pastries",
  },
  {
    name: "Café au Lait",
    slug: "cafe-au-lait",
    price: 10,
    imageUrl: "https://i.imgur.com/2w8v4lR.jpg",
    category: "Beverages",
  },
  {
    name: "Baguette",
    slug: "baguette",
    price: 10,
    imageUrl: "https://i.imgur.com/2w8v4lR.jpg",
    category: "Breads",
  },
  {
    name: "Sandwich Poulet Mayo",
    slug: "sandwich-poulet-mayo",
    price: 10,
    imageUrl: "https://i.imgur.com/2w8v4lR.jpg",
    category: "Sandwiches",
  },
];
