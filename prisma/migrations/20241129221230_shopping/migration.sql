/*
  Warnings:

  - The values [MOTEL] on the enum `AccommodationType` will be removed. If these variants are still used in the database, this will fail.
  - The values [FOOD_DRINKS] on the enum `CategoryType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `location` on the `Tourism` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `localGovt` to the `Accommodation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `Tourism` table without a default value. This is not possible if the table is not empty.
  - Added the required column `localGovt` to the `Tourism` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ShoppingType" AS ENUM ('MALL', 'MARKET');

-- CreateEnum
CREATE TYPE "NightlifeType" AS ENUM ('CLUB', 'LOUNGE', 'BARS_CAFE');

-- AlterEnum
BEGIN;
CREATE TYPE "AccommodationType_new" AS ENUM ('AIRBNB', 'APARTMENT', 'HOTEL', 'RESORT');
ALTER TABLE "Accommodation" ALTER COLUMN "type" TYPE "AccommodationType_new" USING ("type"::text::"AccommodationType_new");
ALTER TYPE "AccommodationType" RENAME TO "AccommodationType_old";
ALTER TYPE "AccommodationType_new" RENAME TO "AccommodationType";
DROP TYPE "AccommodationType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "CategoryType_new" AS ENUM ('ACCOMMODATION', 'EVENT', 'FOOD_DRINK', 'NIGHTLIFE', 'SHOPPING', 'TOURISM');
ALTER TABLE "Accommodation" ALTER COLUMN "category" TYPE "CategoryType_new" USING ("category"::text::"CategoryType_new");
ALTER TABLE "Tourism" ALTER COLUMN "category" TYPE "CategoryType_new" USING ("category"::text::"CategoryType_new");
ALTER TABLE "Shopping" ALTER COLUMN "category" TYPE "CategoryType_new" USING ("category"::text::"CategoryType_new");
ALTER TABLE "Nightlife" ALTER COLUMN "category" TYPE "CategoryType_new" USING ("category"::text::"CategoryType_new");
ALTER TABLE "Event" ALTER COLUMN "category" TYPE "CategoryType_new" USING ("category"::text::"CategoryType_new");
ALTER TABLE "Food_Drink" ALTER COLUMN "category" TYPE "CategoryType_new" USING ("category"::text::"CategoryType_new");
ALTER TYPE "CategoryType" RENAME TO "CategoryType_old";
ALTER TYPE "CategoryType_new" RENAME TO "CategoryType";
DROP TYPE "CategoryType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Accommodation" DROP CONSTRAINT "Accommodation_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Tourism" DROP CONSTRAINT "Tourism_categoryId_fkey";

-- AlterTable
ALTER TABLE "Accommodation" ADD COLUMN     "imageUrls" TEXT[],
ADD COLUMN     "localGovt" TEXT NOT NULL,
ALTER COLUMN "type" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Tourism" DROP COLUMN "location",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "imageUrls" TEXT[],
ADD COLUMN     "localGovt" TEXT NOT NULL;

-- DropTable
DROP TABLE "Category";

-- CreateTable
CREATE TABLE "Shopping" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "localGovt" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrls" TEXT[],
    "slug" TEXT NOT NULL,
    "type" "ShoppingType" NOT NULL,
    "category" "CategoryType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" TEXT,

    CONSTRAINT "Shopping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nightlife" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "localGovt" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrls" TEXT[],
    "slug" TEXT NOT NULL,
    "type" "NightlifeType" NOT NULL,
    "category" "CategoryType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" TEXT,

    CONSTRAINT "Nightlife_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "localGovt" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrls" TEXT[],
    "slug" TEXT NOT NULL,
    "category" "CategoryType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" TEXT,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Food_Drink" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "localGovt" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrls" TEXT[],
    "slug" TEXT NOT NULL,
    "category" "CategoryType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" TEXT,

    CONSTRAINT "Food_Drink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Shopping_slug_key" ON "Shopping"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Shopping_id_slug_key" ON "Shopping"("id", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "Nightlife_slug_key" ON "Nightlife"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Nightlife_id_slug_key" ON "Nightlife"("id", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "Event_slug_key" ON "Event"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Event_id_slug_key" ON "Event"("id", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "Food_Drink_slug_key" ON "Food_Drink"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Food_Drink_id_slug_key" ON "Food_Drink"("id", "slug");

-- AddForeignKey
ALTER TABLE "Shopping" ADD CONSTRAINT "Shopping_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nightlife" ADD CONSTRAINT "Nightlife_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Food_Drink" ADD CONSTRAINT "Food_Drink_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
