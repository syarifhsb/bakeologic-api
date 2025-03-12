import { z } from "zod";
import { SeedProductSchema } from "./schema";

export type SeedProduct = z.infer<typeof SeedProductSchema>;

export const seedDataProducts: SeedProduct[] = [
  {
    name: "Butter Croissant",
    slug: "butter-croissant",
    price: 10,
    category: "Pastries",
    images: [
      {
        url: "https://media.istockphoto.com/id/1494437052/fr/photo/croissant-et-pain-au-chocolat-sur-planche-de-bois.jpg?s=612x612&w=0&k=20&c=n_WFRLWhoaodKtlPoNYuXyTjKZCgz8Y5vGYwyt2zltU=",
        altText: "Butter Croissant",
      },
    ],
  },
  {
    name: "Flan Nature",
    slug: "flan-nature",
    price: 10,
    category: "Pastries",
    images: [
      {
        url: "https://media.istockphoto.com/id/1151266653/fr/photo/flan.jpg?s=612x612&w=0&k=20&c=z6-2yBkykk6GGHU5Ql_I8uxnfYcWnjXavzlX3M9oUso=",
        altText: "Flan Nature",
      },
    ],
  },

  {
    name: "Pain au Chocolat",
    slug: "pain-au-chocolat",
    images: [
      {
        url: "https://media.istockphoto.com/id/672982342/fr/photo/three-pain-au-chocolat.jpg?s=612x612&w=0&k=20&c=39H5GMmoPsIn5BeooqFGovtexnAyC2ro1BBhGseOOO8=",
        altText: "Pain au Chocolat",
      },
    ],
    price: 10,
    category: "Pastries",
  },
  {
    name: "Café au Lait",
    slug: "cafe-au-lait",
    price: 10,
    category: "Beverages",
    images: [
      {
        url: "https://media.istockphoto.com/id/505168330/fr/photo/caf%C3%A9-tasse-de-caf%C3%A9-avec-les-grains-de-caf%C3%A9-et-de-b%C3%A2tons-de-cannelle.jpg?s=612x612&w=0&k=20&c=Tqy_hbEGlgzWJxHFn0H_fuvvvzHAwLgqHN350dxttT0=",
        altText: "Café au Lait",
      },
    ],
  },
  {
    name: "Baguette",
    slug: "baguette",
    price: 10,
    category: "Breads",
    images: [
      {
        url: "https://media.istockphoto.com/id/166578145/fr/photo/baguettes-de-pain.jpg?s=612x612&w=0&k=20&c=F2_xC144R7CZ8pl-3BYmCOyzK21rSrnXlOCElCdf8j0=",
        altText: "Baguette",
      },
    ],
  },
  {
    name: "Sandwich Poulet Mayo",
    slug: "sandwich-poulet-mayo",
    price: 10,
    category: "Sandwiches",
    images: [
      {
        url: "https://media.istockphoto.com/id/535466213/fr/photo/sandwich.jpg?s=612x612&w=0&k=20&c=6prAdceabsf4kCuRJBngJUKYRoRdpXKu4Z81KY6YfOk=",
        altText: "Chicken Sandwich",
      },
    ],
  },
];
