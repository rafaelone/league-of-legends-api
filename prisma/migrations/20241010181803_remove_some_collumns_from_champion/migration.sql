/*
  Warnings:

  - You are about to drop the column `damage` on the `champions` table. All the data in the column will be lost.
  - You are about to drop the column `damage_type` on the `champions` table. All the data in the column will be lost.
  - You are about to drop the column `difficulty` on the `champions` table. All the data in the column will be lost.
  - You are about to drop the column `group_control` on the `champions` table. All the data in the column will be lost.
  - You are about to drop the column `move_speed` on the `champions` table. All the data in the column will be lost.
  - You are about to drop the column `resistance` on the `champions` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `champions` table. All the data in the column will be lost.
  - You are about to drop the column `utility` on the `champions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "champions" DROP COLUMN "damage",
DROP COLUMN "damage_type",
DROP COLUMN "difficulty",
DROP COLUMN "group_control",
DROP COLUMN "move_speed",
DROP COLUMN "resistance",
DROP COLUMN "type",
DROP COLUMN "utility";
