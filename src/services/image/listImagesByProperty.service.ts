import { AppDataSource } from '../../data-source'
import { Property } from '../../entities/property.entity'
import AppError from '../../errors/appError'

export default class ListImageByProperty {
  public static async execute(property_id: string) {
    const propertyRepository = AppDataSource.getRepository(Property)

    const property = await propertyRepository.findOne({
      where: {
        id: property_id,
      },
    })

    if (!property) {
      throw new AppError('Property not found')
    }

    return property.image
  }
}
