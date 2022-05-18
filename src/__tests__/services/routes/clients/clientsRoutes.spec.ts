import { AppDataSource } from '../../../../data-source'
import request from 'supertest'
import app from '../../../../app'
import { ICreateClient } from '../../../../interfaces/client'

describe('Succes Routes', () => {
  beforeAll(async () => {
    await AppDataSource.initialize().catch((err) =>
      console.log(err)
    )
  })
  afterAll(async () => {
    await AppDataSource.destroy().catch((err) =>
      console.log(err)
    )
  })

  it('Should create a new user', async () => {
    const client: ICreateClient = {
      name: 'Gorimar',
      email: 'gorimar34@mail.com',
      phone_number: '1234567890122',
      intention: 'comprar',
    }

    const response = await request(app).post('/clients').send(client)

    
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
  })
})
