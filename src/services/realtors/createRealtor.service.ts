import { AppDataSource } from "../../data-source";
import bcrypt from "bcrypt";
import { IRealtors } from "../../interfaces/realtor";

export default class CreateRealtorService {
  public static async execute(data: IRealtors): Promise<Realtors> {
    const {password} = data;

    const realtorRepo = AppDataSource.getRepository(Realtor);

    const hash = await bcrypt.hash(password, 10);
    data.password = hash

    const newRealtor = realtorRepo.create(data);

    await realtorRepo.save(newRealtor);

    return newRealtor;
  }
}
