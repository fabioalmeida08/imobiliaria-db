import { AppDataSource } from "../../data-source";
import { Realtor } from "../../entities/realtor.entity";
import AppError from "../../errors/appError";
import { IRealtors } from "../../interfaces/realtor";

export default class ListOneRealtorService {
  public static async execute(data: IRealtors): Promise<Realtor> {
    const { email } = data;
    const realtorRepo = AppDataSource.getRepository(Realtor);
    const findRealtors = await realtorRepo.find();
    const findRealtor = findRealtors.find((user) => user.email === email);
  
    if(!findRealtor){
      throw new AppError("Realtor not found", 400)
    }
    return findRealtor;
  }
}
