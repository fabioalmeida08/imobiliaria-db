import { AppDataSource } from "../../data-source";
import { Realtor } from "../../entities/realtor.entity";
import AppError from "../../errors/appError";

export default class DeleteRealtorService {
    public static async execute(id : string): Promise<Realtor> {
      const realtorRepo = AppDataSource.getRepository(Realtor);
      const realtors = await realtorRepo.find()
      
      const findDeleteRealtor =  realtors.find((user) => user.id === id)
       if(!findDeleteRealtor){
         throw new AppError("Realtor not found", 400)
       }
      await realtorRepo.delete(findDeleteRealtor!.id);
  
      return findDeleteRealtor;
    }
  }
  