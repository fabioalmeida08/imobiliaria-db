import { AppDataSource } from "../../data-source";
import { IRealtors } from "../../interfaces/realtor";

export default class ListOneRealtorService {
  public static async execute(data: IRealtors): Promise<Realtors> {
    const { email } = data;
    const realtorRepo = AppDataSource.getRepository(Realtor);
    const findRealtors = realtorRepo.find();
    const findRealtor = findRealtors.find((user) => user.email === email);

    return findRealtor;
  }
}
