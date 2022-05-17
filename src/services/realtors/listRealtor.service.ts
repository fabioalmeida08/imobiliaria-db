import { AppDataSource } from "../../data-source";
import { IRealtors } from "../../interfaces/realtor";

export default class ListRealtorService {
    public static async execute(data : IRealtors): Promise<Realtors> {
     
  
      const realtorRepo = AppDataSource.getRepository(Realtor);
      const findRealtors = realtorRepo.find()
  
      return findRealtors;
    }
  }
  