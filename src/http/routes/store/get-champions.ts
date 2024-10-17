import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { env } from '@/env'
import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

export async function getChampions(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/store',
      {
        schema: {
          tags: ['Store'],
          summary: 'Get all champions that user has not yet purchased',
          security: [
            {
              bearerAuth: [],
            },
          ],
          response: {
            200: z.object({
              champions: z.array(
                z.object({
                  id: z.string().uuid(),
                  name: z.string(),
                  title: z.string(),
                  description: z.string(),
                  priceRiotPoints: z.number(),
                  priceEssencial: z.number(),
                  thumbnail: z.string(),
                }),
              ),
            }),
          },
        },
      },
      async (request, reply) => {
        const userId = await request.getCurrentUserId()

        const redis = app.redis
        const cacheKey = `get-user-champions:${userId}`

        const cacheChampions = await redis.get(cacheKey)

        if (cacheChampions) {
          return { champions: JSON.parse(cacheChampions) }
        }

        const ownedChampions = await prisma.userChampion.findMany({
          where: {
            userId,
          },
          select: {
            championId: true,
          },
        })

        const ownedChampionIds = ownedChampions.map((uc) => uc.championId)

        const championsNotOwned = await prisma.champion.findMany({
          where: {
            id: {
              notIn: ownedChampionIds,
            },
          },
        })

        const champions = championsNotOwned.map((champion) => ({
          id: champion.id,
          name: champion.name,
          title: champion.title,
          description: champion.description,
          priceRiotPoints: champion.priceRiotPoints,
          priceEssencial: champion.priceEssencial,
          thumbnail: `${env.BUCKET_CHAMPIONS_URL}/objects/download?preview=true&prefix=${champion.name}.jpg&version_id=null`,
        }))

        await redis.set(cacheKey, JSON.stringify(champions))

        return reply.send({ champions })
      },
    )
}
