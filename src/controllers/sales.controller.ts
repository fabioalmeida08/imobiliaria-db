import { Request, response, Response } from "express"
import CreateSaleService from "../services/sales/createSale.service"
import ListSalesService from "../services/sales/listSales.service"
import ShowSaleService from "../services/sales/showSale.service"
import UpdateSaleService from "../services/sales/updateSales.service"

export default class SalesController {
  public static async store(req: Request, res: Response) {
    let data = { ...req.body }

    const newSale = await CreateSaleService.execute(data)

    return res.status(201).json(newSale)
  }

  public static async show(req: Request, res: Response) {
    const { id } = req.params
    const sale = await ShowSaleService.execute(id)
    return res.status(200).json(sale)
  }

  public static async index(req: Request, res: Response) {
    const listOfSales = await ListSalesService.execute()

    return res.status(200).json(listOfSales)
  }

  public static async update(req: Request, res: Response) {
    const data = req.body
    const { id } = req.params
    const updatedSale = await UpdateSaleService.execute(id, data)
    return res.status(200).json(updatedSale)
  }
}
