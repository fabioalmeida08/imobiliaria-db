import { Request, Response } from 'express'
import CreateImageService from '../services/image/createImage.service'
import DeleteImageService from '../services/image/deleteImage.service'
import ListImageByProperty from '../services/image/listImagesByProperty.service'

export default class ImageController {
  public static async store(request: Request, response: Response) {
    const { property_id } = request.body
    const image_url = request.firebaseUrl

    const propertyImage = await CreateImageService.execute(
      image_url,
      property_id
    )

    return response.status(201).json(propertyImage)
  }

  public static async index(request: Request, response: Response) {
    const { property_id } = request.params

    const listImages = await ListImageByProperty.execute(property_id)

    return response.status(200).json(listImages)
  }

  public static async delete(request: Request, response: Response) {
    const { image_id } = request.params
    await DeleteImageService.execute(image_id)

    return response.status(204).json()
  }
}
