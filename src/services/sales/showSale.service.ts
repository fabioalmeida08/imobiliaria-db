import { AppDataSource } from "../../data-source"

import { Sales } from "../../entities/sales.entity"

export default class ShowSaleService {
  public static async execute(id: string) {
    const salesRepo = AppDataSource.getRepository(Sales)
    const sale = await salesRepo.findOneBy({ id })
    return sale
  }
}
