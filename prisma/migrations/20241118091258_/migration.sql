/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Accommodation` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `Tourism` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Accommodation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Tourism` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Accommodation" DROP CONSTRAINT "Accommodation_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Tourism" DROP CONSTRAINT "Tourism_categoryId_fkey";

-- AlterTable
ALTER TABLE "Accommodation" DROP COLUMN "categoryId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tourism" DROP COLUMN "categoryId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Category";

-- AddForeignKey
ALTER TABLE "Accommodation" ADD CONSTRAINT "Accommodation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tourism" ADD CONSTRAINT "Tourism_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
