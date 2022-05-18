import { AppDataSource } from "../../data-source";
import { Agency } from "../../entities/agency.entity";
import AppError from "../../errors/appError";

export default class ListOneAgencyService {
  public static async execute(id : string){

    const AgencyRepo = AppDataSource.getRepository(Agency);
    const agencies = await AgencyRepo.find();
    const findAgency = agencies.find((user) => user.id === id);
  
    if(!findAgency){
      throw new AppError("Agency not found", 400)
    }

    return findAgency;
  }
}