import 'fastify'

import { Redis as RedisClient } from 'ioredis'

declare module 'fastify' {
  export interface FastifyRequest {
    getCurrentUserId(): Promise<string>
  }

  interface FastifyInstance {
    redis: RedisClient
  }
}
