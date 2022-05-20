import { AppDataSource } from '../../data-source'
import { Clients } from '../../entities/clients.entity'
import { Images } from '../../entities/images.entity'
import { Property } from '../../entities/property.entity'
import { Realtor } from '../../entities/realtor.entity'
import { CreateProperty } from '../../interfaces/properties'

export default class CreatePropertyService {
  public static async execute(data: CreateProperty, img_url: string) {
    const propertyRepository = AppDataSource.getRepository(Property)
    const clientRepository = AppDataSource.getRepository(Clients)
    const realtorRepository = AppDataSource.getRepository(Realtor)
    const imageRepository = AppDataSource.getRepository(Images)

    const client_seller = await clientRepository.findOne({
      where: {
        id: data.id_client,
      },
    })

    const realtor_creator = await realtorRepository.findOne({
      where: {
        id: data.id_realtor,
      },
    })

    const image = imageRepository.create({ img_url })
    await imageRepository.save(image)

    /*const property = new Property()
    property.street = data.street
    property.city = data.city
    property.state = data.state
    property.postal_code = data.postal_code
    property.country = data.country
    property.area = data.area
    property.complement = data.complement
    property.type = data.type
    property.acquisition_type = data.acquisition_type
    property.price = data.price
    property.description = data.description
    property.client_seller = client_seller as Clients
    property.realtor_creator = realtor_creator as Realtor
    property.image = [image]*/
    const property = propertyRepository.create({
      ...data,
      ...image,
      ...client_seller,
      ...realtor_creator,
    })

    await propertyRepository.save(property)

    return property
  }
}
