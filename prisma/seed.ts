import { prisma } from "../src/lib/prisma";
import { convertSlug } from "../src/lib/slug";
import { seedDataProducts } from "../src/modules/products/data";

async function seedProducts() {
  for (const seedDataProduct of seedDataProducts) {
    const { category, images, ...product } = seedDataProduct;

    const categorySlug = convertSlug(category);

    const productData = {
      ...product,
      images: {
        connectOrCreate: images.map((image) => ({
          where: { url: image.url },
          create: {
            url: image.url,
            altText: image.altText,
          },
        })),
      },
      category: {
        connectOrCreate: {
          where: { slug: categorySlug },
          create: {
            slug: categorySlug,
            name: category,
          },
        },
      },
    };

    const newProduct = await prisma.product.upsert({
      where: { slug: productData.slug },
      update: productData,
      create: productData,
    });

    console.info(`Seeded product: 🥐 ${newProduct.name}`);
  }
}

seedProducts();
