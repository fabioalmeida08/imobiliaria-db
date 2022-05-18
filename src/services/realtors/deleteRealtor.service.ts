import { AppDataSource } from "../../data-source";

export default class DeleteRealtorService {
    public static async execute(id : string): Promise<Realtors> {
      const realtorRepo = AppDataSource.getRepository(Realtor);
      const realtors = realtorRepo.find()

      const findDeleteRealtor = await realtors.find((user) => user.id === id)
    
      await realtorRepo.delete(findDeleteRealtor!.id);
  
      return findDeleteRealtor;
    }
  }
  