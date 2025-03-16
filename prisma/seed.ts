import { Prisma } from "@prisma/client";

import { prisma } from "../src/lib/prisma";
import { seedDataCategories } from "../src/modules/category/data";
import { seedDataProducts } from "../src/modules/product/data";

async function seedCategories() {
  for (const seedDataCategory of seedDataCategories) {
    const newCategory = await prisma.category.upsert({
      where: { slug: seedDataCategory.slug },
      update: seedDataCategory,
      create: seedDataCategory,
    });

    console.info(`📜 Category: ${newCategory.name}`);
  }
}

async function seedProducts() {
  for (const seedDataProduct of seedDataProducts) {
    const { categorySlug, images, ...product } = seedDataProduct;

    const productData: Prisma.ProductCreateInput = {
      ...product,
      category: { connect: { slug: categorySlug } },
      images: {
        connectOrCreate: images.map((image) => ({
          where: { url: image.url },
          create: {
            url: image.url,
            altText: image.altText,
          },
        })),
      },
    };

    const resultProduct = await prisma.product.upsert({
      where: { slug: productData.slug },
      update: productData,
      create: productData,
    });

    console.info(`🥐 Product: ${resultProduct.name}`);
  }
}

async function main() {
  await seedCategories();
  await seedProducts();
}

main()
  .then(() => {
    console.info("🌱 Seeding complete!");
    prisma.$disconnect();
  })
  .catch((error) => {
    console.error("🔥 Seeding failed!");
    console.error(error);
    process.exit(1);
  });
