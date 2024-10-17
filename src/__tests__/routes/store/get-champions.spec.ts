import request from 'supertest'

import { app } from '@/http/server'
import { prisma } from '@/lib/prisma'

describe('Get all champions', () => {
  beforeAll(async () => {
    await app.ready()
  })
  beforeEach(async () => {
    await prisma.user.deleteMany({})
    await prisma.userChampion.deleteMany({})
  })
  afterAll(async () => {
    await app.close()
  })

  it('GET /store should be able to get all champions', async () => {
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

    const store = await request(app.server)
      .get('/store')
      .set('Authorization', `Bearer ${signIn.token}`)

    expect(store.status).toBe(200)
  })

  it('GET /store should be return champions in cache', async () => {
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

    const store = await request(app.server)
      .get('/store')
      .set('Authorization', `Bearer ${signIn.token}`)

    expect(store.status).toBe(200)

    const data = JSON.parse(store.text)

    const storeCache = await request(app.server)
      .get('/store')
      .set('Authorization', `Bearer ${signIn.token}`)

    const cacheData = JSON.parse(storeCache.text)

    expect(cacheData.champions).toEqual(data.champions)
  })
})
