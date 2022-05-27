import { AppDataSource } from "../../data-source";
import { Realtor } from "../../entities/realtor.entity";
import AppError from "../../errors/appError";
import { IRealtorsId, IReturnRealtor } from "../../interfaces/realtor";

export default class ListOneRealtorService {
  public static async execute(id : string){

    const realtorRepo = AppDataSource.getRepository(Realtor);
    const findRealtors = await realtorRepo.find();
    const findRealtor = findRealtors.find((user) => user.id === id);
  
    if(!findRealtor){
      throw new AppError("Realtor not found", 404)
    }
    
    let listProperties:IRealtorsId[] = [];

    findRealtor.properties_created.forEach((item)=>{
      listProperties = [ ...listProperties,
        {
          id: item.id as string,
        }
       ]
      })

    let realtorReturn: IReturnRealtor = {
      ...findRealtor,
      properties_created: listProperties
    }

     return realtorReturn
  }
}
