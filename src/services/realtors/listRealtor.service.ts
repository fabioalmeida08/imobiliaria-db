import { AppDataSource } from "../../data-source";
import { Realtor } from "../../entities/realtor.entity";
import AppError from "../../errors/appError";
export default class ListRealtorService {
    public static async execute(): Promise<Realtor[]> {
    
      const realtorRepo = AppDataSource.getRepository(Realtor);
      const findRealtors = await realtorRepo.find()

      if(!findRealtors){
        throw new AppError("Something is wrong", 400)
      }
  
      return findRealtors;
    }
  }
  