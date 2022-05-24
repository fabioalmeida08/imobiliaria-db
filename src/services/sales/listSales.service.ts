import { AppDataSource } from "../../data-source";
import { Sales } from "../../entities/sales.entity";

export default class ListSalesService {
  public static async execute(): Promise<Sales[]> {
    const salesRepo = AppDataSource.getRepository(Sales);
    const listOfSales = await salesRepo.find();
    return listOfSales;
  }
}
