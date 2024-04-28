/*
  Warnings:

  - You are about to drop the column `content` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Category` table. All the data in the column will be lost.
  - Added the required column `category` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `counter` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "content",
DROP COLUMN "title",
ADD COLUMN     "category" VARCHAR(255) NOT NULL,
ADD COLUMN     "counter" INTEGER NOT NULL,
ADD COLUMN     "latitude" INTEGER,
ADD COLUMN     "longitude" INTEGER;
