-- DropForeignKey
ALTER TABLE "champions" DROP CONSTRAINT "champions_skin_id_fkey";

-- AlterTable
ALTER TABLE "champions" ALTER COLUMN "skin_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "champions" ADD CONSTRAINT "champions_skin_id_fkey" FOREIGN KEY ("skin_id") REFERENCES "skins"("id") ON DELETE SET NULL ON UPDATE CASCADE;
