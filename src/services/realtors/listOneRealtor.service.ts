import { AppDataSource } from "../../data-source";
import { Realtor } from "../../entities/realtor.entity";
import AppError from "../../errors/appError";

export default class ListOneRealtorService {
  public static async execute(id : string){

    const realtorRepo = AppDataSource.getRepository(Realtor);
    const findRealtors = await realtorRepo.find();
    const findRealtor = findRealtors.find((user) => user.id === id);
  
    if(!findRealtor){
      throw new AppError("Realtor not found", 4004)
    }
    return findRealtor;
  }
}
