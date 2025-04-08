import { z } from "zod";

import { SeedProductSchema } from "../product/schema";

export type SeedProduct = z.infer<typeof SeedProductSchema>;

export const seedDataProducts: SeedProduct[] = [
  {
    slug: "butter-croissant",
    name: "Butter Croissant",
    description:
      "Experience the classic French pastry at its finest. Our Butter Croissant boasts a golden, flaky exterior that gives way to a soft, buttery interior. Each bite delivers a delicate crunch followed by a melt-in-your-mouth sensation, making it the perfect companion to your morning coffee or afternoon tea.",
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
    description:
      "Indulge in the creamy delight of our Flan Nature. This traditional French custard dessert features a smooth, velvety texture with a rich vanilla flavor, all encased in a delicate caramel glaze. It's a timeless treat that offers pure, simple pleasure in every spoonful.",
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
    description:
      "Satisfy your chocolate cravings with our Pain au Chocolat. This delectable pastry combines the flaky layers of a croissant with a luscious dark chocolate filling. Each bite offers a harmonious blend of buttery pastry and rich chocolate, making it an irresistible choice for any time of day.",
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
    name: "Bakeologic's Cappuccino",
    description:
      "levate your coffee experience with Bakeologic’s Cappuccino — a rich, aromatic espresso layered with velvety steamed milk and crowned with a cloud of frothy foam. Each cup delivers a perfect balance of bold flavor and creamy texture, making it a comforting indulgence from the first sip to the last. Perfectly crafted to warm your soul and energize your day.",
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
    description:
      "Experience the authentic taste of France with our French Baguette. Baked to perfection, this artisanal bread features a crisp, golden crust and a soft, airy interior. Whether paired with cheese, used for sandwiches, or enjoyed on its own, our baguette is a versatile staple for any occasion.​",
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
    description:
      "Delight in our Chicken Sandwich, a satisfying combination of tender, seasoned chicken and creamy mayonnaise, nestled between slices of freshly baked bread. This hearty sandwich offers a perfect balance of flavors and textures, making it an ideal choice for a quick and delicious meal",
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
