import { DeleteResult } from 'typeorm'
import { AppDataSource } from '../../../data-source'
import { Property } from '../../../entities/property.entity'
import AppError from '../../../errors/appError'
import { IClient, ICreateClient } from '../../../interfaces/client'
import { CreateProperty } from '../../../interfaces/properties'
import { IRealtors, IRealtorsExtId } from '../../../interfaces/realtor'
import CreateClientService from '../../../services/clients/createClient.service'
import CreatePropertyService from '../../../services/properties/createProperty.service'
import DeletePropertyService from '../../../services/properties/deleteProperty.service'
import ListPropertiesService from '../../../services/properties/listProperties.service'
import ListPropertiesByQueryService from '../../../services/properties/listPropertiesByQuery.service'
import ShowPropertyService from '../../../services/properties/showProperty.service'
import UpdatePropertyService from '../../../services/properties/updateProperty.service'
import CreateRealtorService from '../../../services/realtors/createRealtor.service'

describe('Properites Services', () => {
  beforeAll(async () => {
    await AppDataSource.initialize().catch((err) => console.log(err))
  })

  afterAll(async () => {
    await AppDataSource.dropDatabase()
    await AppDataSource.destroy().catch((err) => console.log(err))
  })

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
  const createRealtor = async () => {
    const realtor: IRealtors = {
      name: 'Gorimar',
      email: 'gorimar@mail.com',
      phone_number: '1234567890122',
      password: 'gorimar123',
    }

    const newRealtor = await CreateRealtorService.execute(realtor)

    realtorCreated = newRealtor

    return realtorCreated
  }

  let createdProperty: Property
  const instanceProperty = async () => {
    const client = await createClient()
    const realtor = await createRealtor()

    const property: CreateProperty = {
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

  it('Should be able to create a new property', async () => {
    const property = await instanceProperty()
    const img_url =
      'https://storage.googleapis.com/capstone-m4-9d18d.appspot.com/1653070526969.jpg'

    const newProperty = await CreatePropertyService.execute(property, img_url)

    createdProperty = newProperty
    expect(newProperty).toHaveProperty('id')
  })

  it('Should return a list of properties with all elements', async () => {
    const properties = await ListPropertiesService.execute()

    expect(properties[0]).toHaveProperty('id')
  })

  it('Should return one property with all elements', async () => {
    const property = await ShowPropertyService.execute(createdProperty.id)

    expect(property).toBeTruthy()

    expect(property).toHaveProperty('id')
  })

  it('Should return the updated property', async () => {
    const updatedProperty = await UpdatePropertyService.execute({
      id: createdProperty.id,
      state: 'Novo estado',
    })

    expect(updatedProperty.state).toBe('Novo estado')
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

    const query = { price_menor: 250000 }

    const filteredProperty = await ListPropertiesByQueryService.execute(query)

    expect(filteredProperty[0]).toHaveProperty('id')
    expect(filteredProperty.length).toBe(1)
    expect(Number(filteredProperty[0].price)).toBeLessThanOrEqual(250000)
  })

  it('Should delete one property', async () => {
    const deleteProperty = await DeletePropertyService.execute(
      createdProperty.id
    )

    expect(deleteProperty).toBeInstanceOf(DeleteResult)
  })
})
