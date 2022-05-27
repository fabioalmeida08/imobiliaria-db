import { AppDataSource } from "../../data-source"

import { Sales } from "../../entities/sales.entity"
import AppError from "../../errors/appError"

export default class ShowSaleService {
  public static async execute(id: string) {
    const salesRepo = AppDataSource.getRepository(Sales)
    const sale = await salesRepo.findOneBy({ id })
    
    if(!sale){
      throw new AppError("Sale is not found")
    }

    return sale
  }
}
