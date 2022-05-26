import { AppDataSource } from '../../data-source'
import { Agency } from '../../entities/agency.entity'
import { IdName } from '../properties/listPropertiesByQuery.service';
import { IReturnAgency } from '../../interfaces/agency'

export default class ListAllAgencyService {
  public static async execute(): Promise<IReturnAgency[]> {
    const AgencyRepo = AppDataSource.getRepository(Agency)
    const allAgency = await AgencyRepo.find()

    let listRealtor:IdName[] = [];

   const returnAgency: IReturnAgency[] = allAgency.map((agency)=>{

        agency.realtors.forEach((item)=>{
          listRealtor = [ ...listRealtor,
          {
            id: item.id as string,
            name: item.name as string
          }
        ]
        })

      let agencyReturn: IReturnAgency = {
        ...agency,
        realtors: listRealtor
      }

      return agencyReturn
    })



    return returnAgency
  }
}