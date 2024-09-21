/*
  Warnings:

  - Made the column `level` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rp` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `essence` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `percentage` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_champion_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_skin_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_tier_id_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "level" SET NOT NULL,
ALTER COLUMN "rp" SET NOT NULL,
ALTER COLUMN "essence" SET NOT NULL,
ALTER COLUMN "tier_id" DROP NOT NULL,
ALTER COLUMN "champion_id" DROP NOT NULL,
ALTER COLUMN "skin_id" DROP NOT NULL,
ALTER COLUMN "percentage" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_tier_id_fkey" FOREIGN KEY ("tier_id") REFERENCES "tier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_champion_id_fkey" FOREIGN KEY ("champion_id") REFERENCES "champions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_skin_id_fkey" FOREIGN KEY ("skin_id") REFERENCES "skins"("id") ON DELETE SET NULL ON UPDATE CASCADE;
