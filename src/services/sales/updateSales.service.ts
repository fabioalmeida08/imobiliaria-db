import { AppDataSource } from "../../data-source"
import { Sales } from "../../entities/sales.entity"
import { IUpdateSale } from "../../interfaces/sales"
import AppError from "../../errors/appError"

export default class UpdateSaleService {
  public static async execute(id: string, data: IUpdateSale) {
    const salesRepo = AppDataSource.getRepository(Sales)
    const sale = await salesRepo.findOneBy({ id })

    if (!sale) {
      throw new AppError("Sale not found")
    }

    data.selling_value
      ? (sale.selling_value = data.selling_value)
      : sale.selling_value
    data.down_payment
      ? (sale.down_payment = data.down_payment)
      : sale.down_payment
    data.description ? (sale.description = data.description) : sale.description
    await salesRepo.save(sale)

    return sale
  }
}
