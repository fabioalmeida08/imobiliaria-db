import { Request, response, Response } from "express";
import CreatePropertyService from "../services/properties/createProperty.service";
import ListPropertiesService from "../services/properties/listProperties.service";

export default class PropertiesController {
  public static async store(req: Request, res: Response) {
    const {
      street,
      city,
      state,
      postal_code,
      country,
      area,
      complement,
      type,
      acquisition_type,
      price,
      availability,
      id_client,
    } = req.body;
    const { id_realtor } = req;

    const property = await CreatePropertyService.execute({
      street,
      city,
      state,
      postal_code,
      country,
      area,
      complement,
      type,
      acquisition_type,
      price,
      availability,
      id_client,
      id_realtor,
    });

    return res.status(201).json(property);
  }

  public static async index(req: Request, res: Response) {
    const id = req.id_realtor
      ? req.id_realtor
      : req.id_agency
      ? req.id_agency
      : "";

    const properties = await ListPropertiesService.execute(id);

    return res.json(properties);
  }

  public static async show(req: Request, res: Response) {}

  public static async update(req: Request, res: Response) {}

  public static async delete(req: Request, res: Response) {}
}
