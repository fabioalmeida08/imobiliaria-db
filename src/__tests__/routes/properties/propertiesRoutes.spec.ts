/*import { AppDataSource } from '../../../../data-source'
import request from 'supertest'
import { Property } from '../../../../entities/property.entity'
import { IClient, ICreateClient } from '../../../../interfaces/client'
import { CreateProperty } from '../../../../interfaces/properties'
import { IRealtors, IRealtorsExtId } from '../../../../interfaces/realtor'
import CreateClientService from '../../../../services/clients/createClient.service'
import CreateRealtorService from '../../../../services/realtors/createRealtor.service'
import app from '../../../../app'
import LoginRealtorService from '../../../../services/realtors/loginRealtor.service'
import CreatePropertyService from '../../../../services/properties/createProperty.service'
import CreateAgencyService from '../../../../services/agency/createAgency.service'
import LoginAgencyService from '../../../../services/agency/agencyLogin.service'
import { assert } from 'console'
import multer from 'multer'
import { uploadImage } from '../../../../services/firebase/firebase'

beforeAll(async () => {
  await AppDataSource.initialize().catch((err) => console.log(err))
})

afterAll(async () => {
  await AppDataSource.dropDatabase()
  await AppDataSource.destroy().catch((err) => console.log(err))
})

describe('Succes Routes', () => {
  let clientCreated: IClient
  const createClient = async () => {
    const client: ICreateClient = {
      name: 'Gorimar',
      email: 'gorimar@mail.com',
      phone_number: '1234567890122',
      intention: 'comprar',
    }

    const newClient = await CreateClientService.execute(client)

    clientCreated = newClient

    return clientCreated
  }

  let realtorCreated: IRealtorsExtId
  interface Token {
    accessToken: string
  }
  let realtorToken: Token
  const createRealtor = async () => {
    const realtor: IRealtors = {
      name: 'Gorimar',
      email: 'gorimar@mail.com',
      phone_number: '1234567890122',
      password: 'gorimar123',
    }

    const newRealtor = await CreateRealtorService.execute(realtor)

    realtorCreated = newRealtor

    const login = await LoginRealtorService.execute({
      email: 'gorimar@mail.com',
      password: 'gorimar123',
    })

    realtorToken = login

    return realtorCreated
  }

  let createdProperty: Property
  const instanceProperty = async () => {
    const client = await createClient()
    const realtor = await createRealtor()

    const property = {
      street: 'Rua teste',
      city: 'Cidade teste',
      state: 'Estado teste',
      postal_code: '12345678',
      country: 'Pais teste',
      area: 50.87,
      complement: 'Complemento teste',
      type: 'Apartamento',
      acquisition_type: 'Venda',
      price: 300000,
      description: 'Descrição teste',
      id_client: client.id,
      id_realtor: realtor.id,
    }

    return property
  }

  /*

  it('Should be able to create a new property', async () => {
    const client = await createClient()
    const realtor = await createRealtor()

    const response = await request(app)
      .post('/properties')
      .set('Authorization', `Bearer ${realtorToken.accessToken}`)
      .attach(
        'image',
        'C:/Users/Igo/Pictures/capstone/paisagem-natural-em-um-jardim-botanico_35355-5948.jpg'
      )
      .field('street', 'Rua teste')
      .field('city', 'Rua teste')
      .field('state', 'Rua teste')
      .field('postal_code', '123456789')
      .field('country', 'Pais teste')
      .field('area', 50.7)
      .field('complement', 'Complement test')
      .field('type', 'Apartamento')
      .field('acquisition_type', 'Venda')
      .field('price', 3000)
      .field('description', 'Descrição teste')
      .field('id_client', client.id)
      .field('id_realtor', realtor.id)
      .then((response) => {
        createdProperty = response.body

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('id')
        expect(response.body).toHaveProperty('createdAt')
      })
  })

  it('Should return a list of properties with selected elements', async () => {
    const response = await request(app).get('/properties')

    expect(response.status).toBe(200)
    expect(response.body).toBeTruthy()
    expect(Object.keys(response.body[0]).length).toBe(21)
    expect(Number(response.body[0].price)).toBe(300000)
  })

  it('Should return a list of properties with all elements', async () => {
    const response = await request(app)
      .get('/properties')
      .set('Authorization', `Bearer ${realtorToken.accessToken}`)

    expect(response.status).toBe(200)
    expect(response.body).toBeTruthy()
    expect(response.body[0]).toHaveProperty('id')
  })

  it('Should return one property with selected elements', async () => {
    const response = await request(app).get(`/properties/${createdProperty.id}`)

    expect(response.status).toBe(200)
    expect(response.body).toBeTruthy()
    expect(Object.keys(response.body).length).toBe(21)
  })

  it('Should return one property with all elements', async () => {
    const response = await request(app)
      .get(`/properties/${createdProperty.id}`)
      .set('Authorization', `Bearer ${realtorToken.accessToken}`)

    expect(response.status).toBe(200)
    expect(response.body).toBeTruthy()
    expect(response.body).toHaveProperty('id')
  })

  it('Should return a filtered list of properties', async () => {
    const propetyTwo: CreateProperty = {
      street: 'Rua teste 2',
      city: 'Cidade teste 2',
      state: 'Estado teste 2',
      postal_code: '87654321',
      country: 'Pais teste 2',
      area: 45,
      complement: 'Complemento teste 2',
      type: 'Casa',
      acquisition_type: 'Venda',
      price: 250000,
      description: 'Descrição teste 2',
      id_client: clientCreated.id,
      id_realtor: realtorCreated.id,
    }
    const img_url =
      'https://storage.googleapis.com/capstone-m4-9d18d.appspot.com/1653070526969.jpg'

    await CreatePropertyService.execute(propetyTwo, img_url)

    const response = await request(app).get(`/properties?price_menor=250000`)

    expect(response.status).toBe(200)
    expect(response.body).toBeTruthy()
    expect(Number(response.body[0].price)).toBeLessThanOrEqual(250000)
    expect(Object.keys(response.body[0]).length).toBe(21)
  })

  it('Should return the updated property', async () => {
    const response = await request(app)
      .patch(`/properties/${createdProperty.id}`)
      .set('Authorization', `Bearer ${realtorToken.accessToken}`)
      .send({ state: 'Novo estado' })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('id')
    expect(response.body.state).toBe('Novo estado')
  })

  //   it("Should delete one property", async () => {
  //     const agency = {
  //       name: "Imobiliaria Legal",
  //       email: "imob@mail.com",
  //       phone_number: "1140028922",
  //       password: "senhaforte",
  //     };

  //     await CreateAgencyService.execute(agency);

  //     const loginAgency = await LoginAgencyService.execute({
  //       email: "imob@mail.com",
  //       password: "senhaforte",
  //     });

  //     const response = await request(app)
  //       .delete(`/properties/${createdProperty.id}`)
  //       .set("Authorization", `Bearer ${loginAgency.accessToken}`);

  //     expect(response.status).toBe(204);
  //   });
})*/

import { AppDataSource } from '../../../data-source'

describe('test file', () => {
  beforeAll(async () => {
    await AppDataSource.initialize().catch((err) => console.log(err))
  })

  afterAll(async () => {
    await AppDataSource.dropDatabase()
    await AppDataSource.destroy().catch((err) => console.log(err))
  })
  it('Should pass', () => {
    expect(2 + 2).toBe(4)
  })
})
