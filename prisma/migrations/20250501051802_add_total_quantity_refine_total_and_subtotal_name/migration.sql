/*
  Warnings:

  - You are about to drop the column `total` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `subtotal` on the `CartItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "total",
ADD COLUMN     "totalPrice" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "totalQuantity" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "CartItem" DROP COLUMN "subtotal",
ADD COLUMN     "totalPrice" DECIMAL(65,30) NOT NULL DEFAULT 0;
