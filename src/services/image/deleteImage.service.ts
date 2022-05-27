import { AppDataSource } from '../../data-source'
import { Images } from '../../entities/images.entity'
import AppError from '../../errors/appError'

export default class DeleteImageService {
  public static async execute(image_id: string) {
    const imageRepository = AppDataSource.getRepository(Images)

    const image = await imageRepository.findOne({
      where: {
        id: image_id,
      },
    })

    if (!image) {
      throw new AppError('Image not found')
    }

    return imageRepository.delete(image_id)
  }
}
