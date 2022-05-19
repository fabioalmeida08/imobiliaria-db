import { Request, response, Response } from "express"
import CreateSaleService from "../services/sales/createSale.service"
import ListSalesService from "../services/sales/listSales.service"
import ShowSaleService from "../services/sales/showSale.service"

export default class SalesController {
  public static async store(req: Request, res: Response) {
    let data = { ...req.body }
    const { id_property } = req.params
    //const id_property = req.params.id
    //const {
    //  selling_value,
    //  down_payment,
    //  description,
    //  realtors,
    //  id_client_buyer,
    //} = req.body

    if (id_property) {
      data = { ...data, id_property }
    }

    const newSale = await CreateSaleService.execute(data)

    return response.status(201).json(newSale)
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
}