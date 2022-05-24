import { DeleteResult } from 'typeorm'
import { AppDataSource } from '../../../data-source'
import { Property } from '../../../entities/property.entity'
import { IClient, ICreateClient } from '../../../interfaces/client'
import { CreateProperty } from '../../../interfaces/properties'
import { IRealtors, IRealtorsExtId } from '../../../interfaces/realtor'
import CreateClientService from '../../../services/clients/createClient.service'
import CreateImageService from '../../../services/image/createImage.service'
import DeleteImageService from '../../../services/image/deleteImage.service'
import ListImageByProperty from '../../../services/image/listImagesByProperty.service'
import CreatePropertyService from '../../../services/properties/createProperty.service'
import CreateRealtorService from '../../../services/realtors/createRealtor.service'

describe('Images services', () => {
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
      name: 'Joao',
      email: 'joaocrazy@mail.com',
      phone_number: '12345678',
      intention: 'comprar',
    }

    const newClient = await CreateClientService.execute(client)

    clientCreated = newClient

    return clientCreated
  }

  let realtorCreated: IRealtorsExtId

  const createRealtor = async () => {
    const realtor: IRealtors = {
      name: 'Romeu',
      email: 'romeu@email.com',
      phone_number: '12345678',
      password: 'romeu123',
    }

    const newRealtor = await CreateRealtorService.execute(realtor)
    realtorCreated = newRealtor

    return realtorCreated
  }

  let createdProperty: Property
  const createProperty = async () => {
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

    const newProperty = await CreatePropertyService.execute(property)
    createdProperty = newProperty

    return createdProperty
  }

  it('Should add an image to the property', async () => {
    await createProperty()
    const img_url = [
      'https://storage.googleapis.com/capstone-m4-9d18d.appspot.com/1653070526969.jpg',
    ]

    const addImage = await CreateImageService.execute(
      img_url,
      createdProperty.id
    )

    expect(addImage).toHaveLength(1)
  })

  it('Should return a property images list', async () => {
    const listImages = await ListImageByProperty.execute(createdProperty.id)

    expect(listImages).toHaveLength(1)
  })

  it('Should delete one image', async () => {
    const img_url = [
      'https://storage.googleapis.com/capstone-m4-9d18d.appspot.com/1653070526969.jpg',
    ]

    const addImage = await CreateImageService.execute(
      img_url,
      createdProperty.id
    )

    let deleteImage = addImage[0].image_id

    let imageDeleted = await DeleteImageService.execute(deleteImage)

    expect(imageDeleted).toBeInstanceOf(DeleteResult)
  })
})
