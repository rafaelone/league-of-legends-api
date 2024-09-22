import { compare } from 'bcryptjs'
import type { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export async function authenticateWithPassword(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/authenticate',
    {
      schema: {
        tags: ['auth'],
        summary: 'Authenticate',
        body: z.object({
          username: z.string(),
          password: z.string(),
        }),
        response: {
          201: z.object({
            token: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { username, password } = request.body

      const user = await prisma.user.findUnique({
        where: { username },
      })

      if (!user) {
        throw new BadRequestError('Invalid credentials.')
      }

      const isPasswordValid = await compare(password, user.password)

      if (!isPasswordValid) {
        throw new BadRequestError('Invalid credentials.')
      }

      const token = await reply.jwtSign(
        {
          sub: user.id,
        },
        {
          sign: {
            expiresIn: '1d',
          },
        },
      )

      return reply.status(201).send({ token })
    },
  )
}
