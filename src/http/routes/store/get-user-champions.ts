import type { FastifyInstance, FastifyRequest } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { env } from '@/env'
import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export async function getUserChampions(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/store/:userId',
    {
      schema: {
        tags: ['Store'],
        summary: 'Get all champions that user has not yet purchased',
        security: [{ bearerAuth: [] }],
        params: z.object({
          userId: z.string().uuid(),
        }),
      },
    },
    async (request: FastifyRequest<{ Params: { userId: string } }>, reply) => {
      const { userId } = request.params

      if (!userId) {
        throw new BadRequestError('User not found')
      }

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
