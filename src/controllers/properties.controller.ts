import { Request, response, Response } from "express";
import CreatePropertyService from "../services/properties/createProperty.service";
import DeletePropertyService from "../services/properties/deleteProperty.service";
import ListPropertiesService from "../services/properties/listProperties.service";
import ShowPropertyService from "../services/properties/showProperty.service";
import UpdatePropertyService from "../services/properties/updateProperty.service";

export default class PropertiesController {
  public static async store(req: Request, res: Response) {
    let data = { ...req.body };
    const { id_realtor } = req;

    if (id_realtor) {
      data = { ...data, id_realtor };
    }

    const property = await CreatePropertyService.execute(data);

    return res.status(201).json(property);
  }

  public static async index(req: Request, res: Response) {
    const id = req.id_realtor
      ? req.id_realtor
      : req.id_agency
      ? req.id_agency
      : undefined;

    const properties = await ListPropertiesService.execute(id);

    return res.json(properties);
  }

  public static async show(req: Request, res: Response) {
    const id = req.id_realtor
      ? req.id_realtor
      : req.id_agency
      ? req.id_agency
      : undefined;

    const { id_property } = req.params;

    const property = await ShowPropertyService.execute(id_property, id);

    return res.json(property);
  }

  public static async update(req: Request, res: Response) {
    const { id_property } = req.params;
    let data = { ...req.body };

    const property = await UpdatePropertyService.execute({
      id: id_property,
      ...data,
    });

    return res.json(property);
  }

  public static async delete(req: Request, res: Response) {
    const { id_property } = req.params;

    await DeletePropertyService.execute(id_property);

    return res.status(204).json();
  }
}
