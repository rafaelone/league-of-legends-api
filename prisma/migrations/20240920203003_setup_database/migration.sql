-- CreateEnum
CREATE TYPE "TierType" AS ENUM ('iron', 'bronze', 'silver', 'gold', 'platinum', 'emerald', 'diamond', 'master', 'gran master', 'challenger');

-- CreateEnum
CREATE TYPE "DamageType" AS ENUM ('magic', 'physical');

-- CreateEnum
CREATE TYPE "SkinType" AS ENUM ('transcendent', 'ultimate', 'mythical', 'legendary', 'epic');

-- CreateTable
CREATE TABLE "tier" (
    "id" TEXT NOT NULL,
    "type" "TierType" NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "tier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "summoner_icon" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 0,
    "percentagem" INTEGER NOT NULL DEFAULT 0,
    "rp" INTEGER NOT NULL DEFAULT 0,
    "essence" INTEGER NOT NULL DEFAULT 0,
    "tier_id" TEXT NOT NULL,
    "champion_id" TEXT NOT NULL,
    "skin_id" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "champions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "damage_type" "DamageType" NOT NULL,
    "damage" INTEGER NOT NULL DEFAULT 0,
    "resistance" INTEGER NOT NULL DEFAULT 0,
    "move_speed" INTEGER NOT NULL DEFAULT 0,
    "group_control" INTEGER NOT NULL DEFAULT 0,
    "utility" INTEGER NOT NULL DEFAULT 0,
    "price_riot_points" INTEGER NOT NULL DEFAULT 0,
    "price_essencial" INTEGER NOT NULL DEFAULT 0,
    "skin_id" TEXT NOT NULL,

    CONSTRAINT "champions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skins" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "splash" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "price_riot_points" INTEGER NOT NULL DEFAULT 0,
    "type" "SkinType" NOT NULL,

    CONSTRAINT "skins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "champions_name_key" ON "champions"("name");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_tier_id_fkey" FOREIGN KEY ("tier_id") REFERENCES "tier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_champion_id_fkey" FOREIGN KEY ("champion_id") REFERENCES "champions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_skin_id_fkey" FOREIGN KEY ("skin_id") REFERENCES "skins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "champions" ADD CONSTRAINT "champions_skin_id_fkey" FOREIGN KEY ("skin_id") REFERENCES "skins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
