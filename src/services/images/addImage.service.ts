import { AppDataSource } from '../../data-source'
import { Images } from '../../entities/images.entity'
import { Property } from '../../entities/property.entity'

export default class AddImageService {
  public static async execute(imageUrl: string, propertyId: string) {
    const propertyRepository = AppDataSource.getRepository(Property)
    const imageRepository = AppDataSource.getRepository(Images)

    const propertyToAddImage = await propertyRepository.findOne({
      where: {
        id: propertyId,
      },
    })

    if (!propertyToAddImage) {
      throw new Error('Property not found')
    }

    const image = new Images()
    image.img_url = imageUrl
    image.property = propertyToAddImage

    imageRepository.create(image)
    await imageRepository.save(image)

    return image
  }
}
