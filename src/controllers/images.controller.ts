import { Request, Response } from 'express'
import AddImageService from '../services/images/addImage.service'

export default class ImagesController {
  public static async store(request: Request, response: Response) {
    const { propertyId } = request.body
    const image = request.firebaseUrl

    const addImage = await AddImageService.execute(image, propertyId)

    return response.status(201).json(addImage)
  }
}
