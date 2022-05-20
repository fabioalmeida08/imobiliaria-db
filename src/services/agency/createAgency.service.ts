import { AppDataSource } from "../../data-source";
import bcryptjs from "bcryptjs";
import { IAgency } from "../../interfaces/agency";
import AppError from "../../errors/appError";
import { Agency } from "../../entities/agency.entity";

export default class CreateAgencyService {
  public static async execute(data: IAgency): Promise<Agency> {
    const { password, email } = data;

    const agencyRepo = AppDataSource.getRepository(Agency);
    const getAgencys = await agencyRepo.find();
    const realters = getAgencys.find((user) => user.email === email);

    if (realters) {
      throw new AppError("Agency already is registered", 401);
    }

    const hash = await bcryptjs.hash(password, 10);
    data.password = hash;

    const newAgency = agencyRepo.create(data);
    await agencyRepo.save(newAgency);

    return newAgency;
  }
}