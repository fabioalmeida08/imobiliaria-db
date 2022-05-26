import { AppDataSource } from "../../data-source";
import { Sales } from "../../entities/sales.entity";
import AppError from "../../errors/appError";

export default class ListSalesService {
  public static async execute(): Promise<Sales[]> {
    const salesRepo = AppDataSource.getRepository(Sales);
    const listOfSales = await salesRepo.find();
    if(!listOfSales){
      throw new AppError("Not sales register")
    }
    
    return listOfSales;
  }
}
