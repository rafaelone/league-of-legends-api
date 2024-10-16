/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `champions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `champions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "champions" ADD COLUMN     "title" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "champions_title_key" ON "champions"("title");
