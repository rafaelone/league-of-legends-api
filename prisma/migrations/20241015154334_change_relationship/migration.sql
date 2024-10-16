/*
  Warnings:

  - You are about to drop the column `champion_id` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_champion_id_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "champion_id";

-- CreateTable
CREATE TABLE "UserChampion" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "championId" TEXT NOT NULL,

    CONSTRAINT "UserChampion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserChampion" ADD CONSTRAINT "UserChampion_championId_fkey" FOREIGN KEY ("championId") REFERENCES "champions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserChampion" ADD CONSTRAINT "UserChampion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
