import { AppDataSource } from "../../data-source";
import bcrypt from "bcrypt";
import { IRealtors, IRealtorsAlteration } from "../../interfaces/realtor";
import { Realtor } from "../../entities/realtor.entity";

export default class UpdateRealtorService {
  public static async execute({data,id } : IRealtorsAlteration) {
   const {name,email,phone_number} = data

    const realtorRepo = AppDataSource.getRepository(Realtor);

    const realtors = await realtorRepo.find()

    const findUpdateRealtor = realtors.find((user) => user.id === id)

    const newInfo = {
        name,
        email,
        phone_number,
      };
    await realtorRepo.update(findUpdateRealtor!.id , newInfo);

    return realtorRepo;
  }
}
