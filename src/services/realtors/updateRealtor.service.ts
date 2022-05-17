import { AppDataSource } from "../../data-source";
import bcrypt from "bcrypt";
import { IRealtors, IRealtorsAlteration } from "../../interfaces/realtor";

export default class UpdateRealtorService {
  public static async execute({data,id } : IRealtorsAlteration): Promise<Realtors> {
   const {name,email,phone_number} = data
    const realtorRepo = AppDataSource.getRepository(Realtor);
    const realtors = realtorRepo.find()
    const findUpdateRealtor = await realtors.find((user) => user.id === id)
    const newInfo = {
        name,
        email,
        phone_number,
      };
    await realtorRepo.update(findUpdateRealtor!.id , newInfo);

    return findUpdateRealtor;
  }
}
