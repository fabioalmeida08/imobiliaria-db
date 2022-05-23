import { Request, response, Response } from 'express'
import CreatePropertyService from '../services/properties/createProperty.service'
import DeletePropertyService from '../services/properties/deleteProperty.service'
import ListPropertiesService from '../services/properties/listProperties.service'
import ListPropertiesByQueryService from '../services/properties/listPropertiesByQuery.service'
import ShowPropertyService from '../services/properties/showProperty.service'
import UpdatePropertyService from '../services/properties/updateProperty.service'
import { instanceToPlain } from 'class-transformer'

export default class PropertiesController {
  public static async store(req: Request, res: Response) {
    let data = { ...req.body }
    const { id_realtor } = req

    const img_url = req.firebaseUrl

    if (id_realtor) {
      data = { ...data, id_realtor }
    }

    const property = await CreatePropertyService.execute(data, img_url)

    return res.status(201).json(property)
  }

  public static async index(req: Request, res: Response) {
    const id = req.id_realtor
      ? req.id_realtor
      : req.id_agency
      ? req.id_agency
      : undefined

    if (req.query) {
      const querys = req.query

      const properties = await ListPropertiesByQueryService.execute(querys)

      if (!id) {
        return res.json(instanceToPlain(properties))
      }

      return res.json(properties)
    }

    const properties = await ListPropertiesService.execute()

    if (!id) {
      return res.json(instanceToPlain(properties))
    }

    return res.json(properties)
  }

  public static async show(req: Request, res: Response) {
    const id = req.id_realtor
      ? req.id_realtor
      : req.id_agency
      ? req.id_agency
      : undefined

    const { id_property } = req.params

    const property = await ShowPropertyService.execute(id_property)

    if (!id) {
      return res.json(instanceToPlain(property))
    }

    return res.json(property)
  }

  public static async update(req: Request, res: Response) {
    const { id_property } = req.params
    let data = { ...req.body }

    const property = await UpdatePropertyService.execute({
      id: id_property,
      ...data,
    })

    return res.json(property)
  }

  public static async delete(req: Request, res: Response) {
    const { id_property } = req.params

    await DeletePropertyService.execute(id_property)

    return res.status(204).json()
  }
}
