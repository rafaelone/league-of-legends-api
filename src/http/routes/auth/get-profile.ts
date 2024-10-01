import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export async function getProfile(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/profile',
      {
        schema: {
          tags: ['auth'],
          summary: 'Get authenticated user profile',
          security: [
            {
              bearerAuth: [],
            },
          ],
          response: {
            200: z.object({
              user: z.object({
                id: z.string().uuid(),
                nickname: z.string().nullable(),
                summonerIcon: z.string().nullable(),
                level: z.number(),
                percentage: z.number(),
                rp: z.number(),
                essence: z.number(),
              }),
            }),
          },
        },
      },
      async (request, reply) => {
        const userId = await request.getCurrentUserId()

        const user = await prisma.user.findUnique({
          select: {
            id: true,
            nickname: true,
            summonerIcon: true,
            level: true,
            percentage: true,
            rp: true,
            essence: true,
          },
          where: { id: userId },
        })

        if (!user) {
          throw new BadRequestError('User not found')
        }

        return reply.send({ user })
      },
    )
}
