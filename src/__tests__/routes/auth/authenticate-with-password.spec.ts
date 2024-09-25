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
      name: 'Teste User',
      email: 'teste@example.com',
      username: 'testuser',
      password: 'test1234',
    })

    const response = await request(app.server).post('/authenticate').send({
      username: 'test',
      password: 'test',
    })

    const signIn = JSON.parse(response.text)

    expect(signIn.message).toEqual('Invalid credentials.')
  })

  it('POST /authenticate should not be able to authenticate with wrong password', async () => {
    await request(app.server).post('/create-account').send({
      name: 'Teste User',
      email: 'teste@example.com',
      username: 'testuser',
      password: 'test1234',
    })

    const response = await request(app.server).post('/authenticate').send({
      username: 'testuser',
      password: 'test',
    })

    const signIn = JSON.parse(response.text)

    expect(signIn.message).toEqual('Invalid credentials.')
  })

  it('POST /authenticate should  be able to authenticate', async () => {
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

    const signIn = JSON.parse(response.text)

    expect(signIn).toMatchObject({
      token: expect.any(String),
    })
  })
})
