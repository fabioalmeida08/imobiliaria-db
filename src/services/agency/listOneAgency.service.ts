import { AppDataSource } from "../../data-source";
import { Agency } from "../../entities/agency.entity";
import AppError from "../../errors/appError";

export default class ListOneAgencyService {
  public static async execute(id : string){

    const AgencyRepo = AppDataSource.getRepository(Agency);
    const findAgency = await AgencyRepo.findOneBy({ id })
  
    if(!findAgency){
      throw new AppError("Agency not found", 400)
    }

    return findAgency;
  }
}