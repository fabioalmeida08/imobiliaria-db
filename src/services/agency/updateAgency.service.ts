import { AppDataSource } from "../../data-source";
import { IAgencyExtId, IReturnAgency } from "../../interfaces/agency";
import { Agency } from "../../entities/agency.entity";
import { response } from "express";
import { IdName } from "../properties/listPropertiesByQuery.service";
import AppError from "../../errors/appError";

export default class UpdateAgencyService {
  public static async execute(data: IReturnAgency){
    const { name, email, phone_number, id } = data;
  
    const agencyRepo = AppDataSource.getRepository(Agency);
  
    const agency = await agencyRepo.findOneBy({ id })
  
    const newInfo = {
      name,
      email,
      phone_number,
    };
    await agencyRepo.update(agency!.id, newInfo);

    const retrunAgency = await agencyRepo.findOneBy({ id })

    if(!retrunAgency){
      throw new AppError("Agency not found")
    }

    let listRealtor:IdName[] = [];

    retrunAgency.realtors.forEach((item)=>{
      listRealtor = [ ...listRealtor,
      {
        id: item.id as string,
        name: item.name as string
      }
    ]
    })

    let agencyReturn: IReturnAgency = {
      ...retrunAgency,
      realtors: listRealtor
    }

    return agencyReturn
  }
}    
