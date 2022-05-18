import { ICreateSale } from "../../interfaces/sales";
import { AppDataSource } from "../../data-source";
import { In } from "typeorm";
import AppError from "../../errors/appError";
import { Sales } from "../../entities/sales.entity";
import { Realtor } from "../../entities/realtor.entity";
import { Clients } from "../../entities/clients.entity";

export default class CreateSaleService {
  public static async execute({
    selling_value,
    down_payment,
    description,
    realtors,
    client_buyer,
    property,
  }: ICreateSale): Promise<Sales[]> {
    const salesRepo = AppDataSource.getRepository(Sales);
    const realtorsRepo = AppDataSource.getRepository(Realtor);
    const clientsRepo = AppDataSource.getRepository(Clients);

    const realtorsList = await realtorsRepo.findBy({
      id: In(realtors),
    });
    if (!realtorsList[realtors.length - 1]) {
      throw new AppError("Invalid list of realtors");
    }

    const client = await clientsRepo.findOne({ where: { id: client_buyer } });
    if (!client) {
      throw new AppError("Invalid buyer client");
    }

    const newSale = salesRepo.create({
      selling_value,
      down_payment,
      description,
      realtors,
      client_buyer,
      property,
    });
    await salesRepo.save(newSale);
    return newSale;
  }
}
