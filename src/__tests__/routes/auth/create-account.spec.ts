import request from 'supertest'

import { app } from '@/http/server'
import { prisma } from '@/lib/prisma'

describe('Create Account', () => {
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

  it('POST /create-account should be able to a create new account', async () => {
    const response = await request(app.server).post('/create-account').send({
      name: 'Teste User',
      email: 'teste@example.com',
      username: 'testuser',
      password: 'test1234',
    })

    expect(response.status).toBe(201)

    const user = await prisma.user.findUnique({
      where: { email: 'teste@example.com' },
    })
    expect(user).toBeTruthy()
    expect(user?.username).toBe('testuser')
  })

  it('POST /create-account should not be able to create a new account with same email', async () => {
    await request(app.server).post('/create-account').send({
      name: 'Teste User',
      email: 'teste@example.com',
      username: 'testuser',
      password: 'test1234',
    })

    const response = await request(app.server).post('/create-account').send({
      name: 'Teste User',
      email: 'teste@example.com',
      username: 'testuser',
      password: 'test1234',
    })

    const data = JSON.parse(response.text)

    expect(response.status).toBe(400)
    expect(data.message).toEqual('User with same e-mail already exists.')
  })

  it('POST /create-account should not be able to create a new account with same username', async () => {
    const response = await request(app.server).post('/create-account').send({
      name: 'Teste User',
      email: 'teste@example.com',
      username: 'testuser',
      password: 'test1234',
    })

    expect(response.status).toBe(201)

    const user = await prisma.user.findUnique({
      where: { email: 'teste@example.com' },
    })
    expect(user).toBeTruthy()
    expect(user?.username).toBe('testuser')

    const otherUser = await request(app.server).post('/create-account').send({
      name: 'Teste User',
      email: 'teste2@example.com',
      username: 'testuser',
      password: 'test1234',
    })

    const text = JSON.parse(otherUser.text)

    expect(otherUser.status).toBe(400)
    expect(text.message).toEqual('User with same username already exists.')
  })
})
