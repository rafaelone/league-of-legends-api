import { PrismaClient } from '@prisma/client'

import CreateChampionsJson from '@/jsons/create-champions.json'

type Champion = {
  name: string
  title: string
  description: string
  priceRiotPoints: number
  priceEssencial: number
}

const prisma = new PrismaClient()

async function createChampions(champions: Champion[], index: number) {
  if (index === champions.length) {
    return
  }

  await prisma.champion.create({
    data: {
      name: champions[index].name,
      title: champions[index].title,
      description: champions[index].description,
      priceRiotPoints: champions[index].priceRiotPoints,
      priceEssencial: champions[index].priceEssencial,
    },
  })

  return createChampions(champions, index + 1)
}

export async function main() {
  await prisma.userChampion.deleteMany()
  await prisma.champion.deleteMany()
  await createChampions(CreateChampionsJson, 0)
}

main()
