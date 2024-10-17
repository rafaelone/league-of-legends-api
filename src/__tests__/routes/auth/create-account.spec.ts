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
      name: 'newAccount',
      email: 'newAccount@example.com',
      username: 'newAccount',
      password: 'newAccount',
    })

    expect(response.status).toBe(201)

    const user = await prisma.user.findUnique({
      where: { email: 'newAccount@example.com' },
    })
    expect(user).toBeTruthy()
    expect(user?.username).toBe('newAccount')
  })

  it('POST /create-account should not be able to create a new account with same email', async () => {
    await request(app.server).post('/create-account').send({
      name: 'newAccount',
      email: 'newAccount@example.com',
      username: 'newAccount',
      password: 'newAccount',
    })

    const response = await request(app.server).post('/create-account').send({
      name: 'newAccount',
      email: 'newAccount@example.com',
      username: 'newAccount',
      password: 'newAccount',
    })

    const data = JSON.parse(response.text)

    expect(response.status).toBe(400)
    expect(data.message).toEqual('User with same e-mail already exists.')
  })

  it('POST /create-account should not be able to create a new account with same username', async () => {
    const response = await request(app.server).post('/create-account').send({
      name: 'newAccount',
      email: 'newAccount@example.com',
      username: 'newAccount',
      password: 'newAccount',
    })

    expect(response.status).toBe(201)

    const user = await prisma.user.findUnique({
      where: { email: 'newAccount@example.com' },
    })
    expect(user).toBeTruthy()
    expect(user?.username).toBe('newAccount')

    const otherUser = await request(app.server).post('/create-account').send({
      name: 'newAccount2',
      email: 'newAccount2@example.com',
      username: 'newAccount',
      password: 'newAccount',
    })

    const text = JSON.parse(otherUser.text)

    expect(otherUser.status).toBe(400)
    expect(text.message).toEqual('User with same username already exists.')
  })
})
