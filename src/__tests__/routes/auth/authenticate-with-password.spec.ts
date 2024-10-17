import request from 'supertest'

import { app } from '@/http/server'
import { prisma } from '@/lib/prisma'

describe('Authenticate with Password', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    // Finaliza o app do Fastify após os testes
    await app.close()
  })

  beforeEach(async () => {
    await prisma.user.deleteMany({})
  })

  it('POST /authenticate should not be able to authenticate with wrong credentials', async () => {
    await request(app.server).post('/create-account').send({
      name: 'Authenticate credentials',
      email: 'authenticate@example.com',
      username: 'authenticate',
      password: 'authenticate',
    })

    const response = await request(app.server).post('/authenticate').send({
      username: 'authenticate wrong',
      password: 'authenticate',
    })

    const signIn = JSON.parse(response.text)

    expect(signIn.message).toEqual('Invalid credentials.')
  })

  it('POST /authenticate should not be able to authenticate with wrong password', async () => {
    await request(app.server).post('/create-account').send({
      name: 'Authenticate password',
      email: 'teauthenticatePassword@example.com',
      username: 'authenticate',
      password: 'authenticate',
    })

    const response = await request(app.server).post('/authenticate').send({
      username: 'authenticate',
      password: 'authenticatePassword',
    })

    const signIn = JSON.parse(response.text)

    console.log(response.text)

    expect(signIn.message).toEqual('Invalid credentials.')
  })

  it('POST /authenticate should  be able to authenticate', async () => {
    await request(app.server).post('/create-account').send({
      name: 'Authenticaete',
      email: 'authenticate@example.com',
      username: 'authenticate',
      password: 'authenticate',
    })

    const response = await request(app.server).post('/authenticate').send({
      username: 'authenticate',
      password: 'authenticate',
    })

    const signIn = JSON.parse(response.text)

    expect(signIn).toMatchObject({
      token: expect.any(String),
    })
  })
})
