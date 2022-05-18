import { AppDataSource } from "../../data-source";
import bcrypt from "bcrypt";
import { IRealtors } from "../../interfaces/realtor";
import AppError from "../../errors/appError";

export default class CreateRealtorService {
  public static async execute(data: IRealtors): Promise<Realtors> {
    const { password, email } = data;

    const realtorRepo = AppDataSource.getRepository(Realtor);

    const realters = await realtorRepo.find((user) => user.email === email);

    if (realters) {
      throw new AppError("Realtor already is registered", 401);
    }

    const hash = await bcrypt.hash(password, 10);
    data.password = hash;

    const newRealtor = realtorRepo.create(data);
    await realtorRepo.save(newRealtor);

    delete newRealtor.password;

    return newRealtor;
  }
}
