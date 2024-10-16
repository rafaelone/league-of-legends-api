import request from 'supertest'
import { z } from 'zod'

import { app } from '@/http/server'
import { prisma } from '@/lib/prisma'

describe('Get User Profile', () => {
  beforeAll(async () => {
    await app.ready()
  })
  beforeEach(async () => {
    await prisma.user.deleteMany({})
  })
  afterAll(async () => {
    // Finaliza o app do Fastify após os testes
    await app.close()
  })

  it('GET /profile should be able to get user profile', async () => {
    await request(app.server).post('/create-account').send({
      name: 'Teste User',
      email: 'teste@example.com',
      username: 'testuser',
      password: 'test1234',
    })

    const response = await request(app.server).post('/authenticate').send({
      username: 'testuser',
      password: 'test1234',
    })

    const signIn: { token: string } = JSON.parse(response.text)

    const profile = await request(app.server)
      .get('/profile')
      .set('Authorization', `Bearer ${signIn.token}`)

    const data: { user: { id: string } } = JSON.parse(profile.text)

    const schema = z.object({
      id: z.string().uuid(),
    })

    const result = schema.safeParse({ id: data.user.id })

    expect(result.success).toBeTruthy()
  })

  it('GET /profile should not be able to get user profile that does not exist', async () => {
    const fakeToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyNTNkOTVlNi0zNTNiLTQyZDEtOTRjZC02ZjlkM2ZmM2QwYzIiLCJpYXQiOjE3MjkxMDEwODEsImV4cCI6MTcyOTE4NzQ4MX0.11QoCz_Ja_MpoOPe62PAsGaAP0IK4uxpygwQ4uJCw50'

    const profile = await request(app.server)
      .get('/profile')
      .set('Authorization', `Bearer ${fakeToken}`)

    expect(profile.status).toBe(400)
  })
})
