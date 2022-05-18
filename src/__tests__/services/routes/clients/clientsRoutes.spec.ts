import { AppDataSource } from '../../../../data-source'
import request from 'supertest'
import app from '../../../../app'
import { ICreateClient,IClient, IUpdatedClient } from '../../../../interfaces/client'

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
describe('Succes Routes', () => {

  let id:string

  const client: ICreateClient = {
    name: 'Gorimar',
    email: 'gorimar54@mail.com',
    phone_number: '1234567890122',
    intention: 'comprar',
  }
  it('Should create a new client', async () => {

    const response = await request(app).post('/clients').send(client)

    id = response.body.id
   
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('createdAt')
  })

  it('Should list clients', async () => {
    const response = await request(app).get('/clients')

    
    expect(response.status).toBe(200)
    expect(response.body).toBeTruthy()
    expect(response.body[0]).toHaveProperty('id')
  })

  it('Should be able to list a user by id', async () => {
    
    const response = await request(app).get(`/clients/${id}`)

    
    expect(response.status).toBe(200)
    expect(response.body.name).toBe('Gorimar')
    expect(response.body.email).toBe('gorimar54@mail.com')
  })

  it('Should be able to update a user', async () => {
    const updatedClient : IUpdatedClient = {
      name:'Goro',
      email:'goro@mail.com'
    }
    const response = await request(app).patch(`/clients/${id}`).send(updatedClient)

    expect(response.status).toBe(200)
    expect(response.body.name).toBe('Goro')
    expect(response.body.email).toBe('goro@mail.com')
    expect(response.body.intention).toBe('comprar')
  })
  
  describe('Error cases routes', () => {
    const clientMissingFields: IUpdatedClient = {
      email: 'gorimar54@mail.com',
      phone_number: '1234567890122',
    }

    const client: ICreateClient = {
    name: 'Gorimar',
    email: 'gorimar33@mail.com',
    phone_number: '1234567890122',
    intention: 'comprar',
  }
    it('Should not let a register without a field' , async () => {
      const response = await request(app).post('/clients').send(clientMissingFields)

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('errors')
    })

    it('Should not be able to create a client with same email',async () => {
      const response = await request(app).post('/clients').send(client)
      const res2 = await request(app).post('/clients').send(client)

      expect(res2.status).toBe(400)
      expect(res2.body).toContain('Already Exists')
    })
  })

  
})
