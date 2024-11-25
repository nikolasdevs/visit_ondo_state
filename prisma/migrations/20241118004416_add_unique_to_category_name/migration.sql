/*
  Warnings:

  - You are about to drop the column `city` on the `Accommodation` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Accommodation` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Accommodation` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Accommodation` table. All the data in the column will be lost.
  - Added the required column `category` to the `Accommodation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Accommodation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('ACCOMMODATION', 'TOURISM', 'SHOPPING', 'NIGHTLIFE', 'FOOD_DRINKS');

-- DropForeignKey
ALTER TABLE "Accommodation" DROP CONSTRAINT "Accommodation_userId_fkey";

-- AlterTable
ALTER TABLE "Accommodation" DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "state",
DROP COLUMN "userId",
ADD COLUMN     "category" "CategoryType" NOT NULL,
ADD COLUMN     "categoryId" TEXT,
ADD COLUMN     "description" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tourism" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" "CategoryType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" TEXT,

    CONSTRAINT "Tourism_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tourism_slug_key" ON "Tourism"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Tourism_id_slug_key" ON "Tourism"("id", "slug");

-- AddForeignKey
ALTER TABLE "Accommodation" ADD CONSTRAINT "Accommodation_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tourism" ADD CONSTRAINT "Tourism_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
