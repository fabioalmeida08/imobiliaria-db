import { AppDataSource } from "../../data-source"
import { Sales } from "../../entities/sales.entity"
import { ISale } from "../../interfaces/sales"

export default class UpdateSaleService {
  public static async execute(data: ISale) {
    const {
      id,
      selling_value,
      down_payment,
      description,
      id_client_buyer,
      id_property,
    } = data

    const salesRepo = AppDataSource.getRepository(Sales)

    const sales = await salesRepo.find()

    const findedSale = sales.find((e) => e.id === id)

    const newSale = {
      selling_value,
      down_payment,
      description,
      id_client_buyer,
      id_property,
    }
    await salesRepo.update(findedSale!.id, newSale)

    return salesRepo.findOneBy({ id })
  }
}
