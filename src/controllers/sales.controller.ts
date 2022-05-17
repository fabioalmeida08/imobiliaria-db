import { Request, Response } from "express";
import CreateSaleService from "../services/sales/CreateSale.service";
import ListSalesService from "../services/sales/ListSales.service";

export default class SalesController {
  public static async store(req: Request, res: Response) {}
  public static async index(req: Request, res: Response) {}
}
