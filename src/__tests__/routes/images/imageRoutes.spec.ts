import { AppDataSource } from '../../../data-source'
import { Property } from '../../../entities/property.entity'
import { IClient, ICreateClient } from '../../../interfaces/client'
import { IRealtors, IRealtorsExtId } from '../../../interfaces/realtor'
import CreateClientService from '../../../services/clients/createClient.service'
import CreateRealtorService from '../../../services/realtors/createRealtor.service'
import LoginRealtorService from '../../../services/realtors/loginRealtor.service'
import request from 'supertest'
import app from '../../../app'
import CreatePropertyService from '../../../services/properties/createProperty.service'
import path from 'path'
import CreateImageService from '../../../services/image/createImage.service'
import { ReturnedPropertyList } from '../../../services/properties/listPropertiesByQuery.service'
import { IAgency, IAgencyExtId, IAgencyLogin, IAgencyToken } from '../../../interfaces/agency'

beforeAll(async () => {
  await AppDataSource.initialize().catch((err) => console.log(err))
})

afterAll(async () => {
  await AppDataSource.dropDatabase()
  await AppDataSource.destroy().catch((err) => console.log(err))
})

describe('Succes Routes', () => {

  // create client

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

  // realtor

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

  // property

  let createdProperty: ReturnedPropertyList
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

    const newProperty = await CreatePropertyService.execute(property)

    createdProperty = newProperty

    return createdProperty
  }

   // agency

   const agency: IAgency = {
    name: "Gorimar",
    email: "gorimar54@mail.com",
    phone_number: "1234567890122",
    password: "12345678"
  };

  const login: IAgencyLogin ={
      email: "gorimar54@mail.com",
      password: "12345678"
  }
  
  let agencyId: IAgencyExtId;

  let token: IAgencyToken;

  /// Agency test 
  
  it("Should create a new agency", async () => {
    const response = await request(app).post("/agency").send(agency);
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("createdAt");
  });
  
  it("Should login agency", async () => {
    const response = await request(app).post("/agency/login").send(login);
    token = response.body.accessToken
    agencyId = response.body.id
    
    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  })

  // create image

  it('Should be able to add image a property', async () => {
    const image = path.resolve(__dirname, '../../imagesTest/imageBotanico.jpg')
    let property = await instanceProperty()

    const response = await request(app)
      .post('/image')
      .attach('image', image)
      .field('property_id', property.id)
      .auth(`${token}`, { type: 'bearer' })

    expect(response.status).toBe(201)
    expect(response.body[0]).toHaveProperty('image_id')
    expect(response.body).toBeTruthy()
  })

  // list image for id property

  it('Should be property image list', async () => {
    const response = await request(app).get(`/image/${createdProperty.id}`).auth(`${token}`, { type: 'bearer' })

    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(1)
  })

  //delete image for id img

  it('Should be delete property image by id', async () => {
    const img_url = [
      'https://storage.googleapis.com/capstone-m4-9d18d.appspot.com/1653070526969.jpg',
    ]
    const createImage = await CreateImageService.execute(
      img_url,
      createdProperty.id
    )

    const response = await request(app)
      .delete(
        `/image/${createImage[0].image_id}`
      )
      .auth(`${token}`, { type: 'bearer' })

    expect(response.status).toBe(204)
  })
})
