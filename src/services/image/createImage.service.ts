import { AppDataSource } from '../../data-source'
import { Images } from '../../entities/images.entity'
import { Property } from '../../entities/property.entity'

export default class CreateImageService {
  public static async execute(image_url: string, property_id: string) {
    const imageRepository = AppDataSource.getRepository(Images)
    const propertyRepository = AppDataSource.getRepository(Property)

    const property = await propertyRepository.findOne({
      where: {
        id: property_id,
      },
    })

    if (!property) {
      throw new Error('Property not find.')
    }

    const imageProperty = new Images()
    imageProperty.img_url = image_url
    imageProperty.property = property

    const image = imageRepository.create(imageProperty)
    await imageRepository.save(image)

    return image
  }
}
