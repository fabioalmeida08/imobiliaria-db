import { AppDataSource } from "../../data-source";
import { IRealtorsExtId } from "../../interfaces/realtor";
import { Realtor } from "../../entities/realtor.entity";

export default class UpdateRealtorService {
  public static async execute(data: IRealtorsExtId) {
    const { name, email, phone_number, id } = data;

    const realtorRepo = AppDataSource.getRepository(Realtor);

    const realtors = await realtorRepo.find();

    const findUpdateRealtor = realtors.find((user) => user.id === id);

    const newInfo = {
      name,
      email,
      phone_number,
    };
    await realtorRepo.update(findUpdateRealtor!.id, newInfo);

    return realtorRepo.findOneBy({ id });
  }
}
