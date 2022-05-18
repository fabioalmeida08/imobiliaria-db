import { AppDataSource } from "../../data-source";
import { IAgencyExtId } from "../../interfaces/agency";
import { Agency } from "../../entities/agency.entity";

export default class UpdateAgencyService {
    public static async execute(data: IAgencyExtId) {
      const { name, email, phone_number, id } = data;
  
      const agencyRepo = AppDataSource.getRepository(Agency);
  
      const agency = await agencyRepo.findOneBy({ id })
  
      const newInfo = {
        name,
        email,
        phone_number,
      };
      await agencyRepo.update(agency!.id, newInfo);
  
      return agencyRepo;
    }
}