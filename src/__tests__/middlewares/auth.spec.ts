// import { app } from '@/http/server'

import crypto from 'crypto'

import { auth } from '@/http/middlewares/auth'
import { app } from '@/http/server'
import { env } from '@/env'

function generateToken(
  payload: { sub: string },
  secret: string = 'supersecret',
): string {
  // Exemplo básico de geração de JWT, ajusta conforme a sua lógica de reply.signIn
  const header = Buffer.from(
    JSON.stringify({ alg: 'HS256', typ: 'JWT' }),
  ).toString('base64')
  const body = Buffer.from(JSON.stringify(payload)).toString('base64')
  const signature = crypto
    .createHmac('sha256', env.JWT_SECRET)
    .update(`${header}.${body}`)
    .digest('base64')

  return `${header}.${body}.${signature}`
}

describe('Auth Middleware', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    // Finaliza o app do Fastify após os testes
    await app.close()
  })
  

  it('should trigger error when invalid auth token', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/store',
      headers: {
        Authorization: `Bearer something`,
      },
    })

    const data = JSON.parse(response.payload)

    expect(response.statusCode).toBe(400)
    expect(data.message).toEqual('Invalid auth token')
  })

  it('should return valid auth token', async () => {
    const token = generateToken({ sub: 'user123' })
    
    const response = await app.inject({
      method: 'GET',
      url: '/store',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    expect(response.statusCode).toBe(200)
    
  })
})
