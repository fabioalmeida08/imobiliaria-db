import { Request, response, Response } from "express";
import CreateSaleService from "../services/sales/CreateSale.service";
import ListSalesService from "../services/sales/ListSales.service";

export default class SalesController {
  public static async store(req: Request, res: Response) {
    const property = req.params.id;
    const { selling_value, down_payment, description, realtors, client_buyer } =
      req.body;

    const newSale = await CreateSaleService.execute({
      selling_value,
      down_payment,
      description,
      realtors,
      client_buyer,
      property,
    });

    return response.status(201).json(newSale);
  }

  public static async index(req: Request, res: Response) {
    const listOfSales = await ListSalesService.execute();

    return res.status(200).json(listOfSales);
  }
}
