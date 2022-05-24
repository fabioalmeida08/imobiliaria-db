import { AppDataSource } from '../../data-source'
import { Images } from '../../entities/images.entity'
import { Property } from '../../entities/property.entity'

export default class CreateImageService {
  public static async execute(image_url: string[], property_id: string) {
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

    let arrayFor = []

    for (let i = 0; i < image_url.length; i++) {
      const imageProperty = new Images()
      imageProperty.img_url = image_url[i]
      imageProperty.property = property

      const image = imageRepository.create(imageProperty)
      await imageRepository.save(image)
      arrayFor.push({ imageUrl: image.img_url, image_id: image.id })
    }
    return arrayFor
  }
}
