import { AppDataSource } from "../../data-source";
import { Realtor } from "../../entities/realtor.entity";
import AppError from "../../errors/appError";
import { IRealtorsId, IRealtorsTwo } from "../../interfaces/realtor";

interface IReturnRealtor extends IRealtorsTwo{
  properties_created: object[]
}

export default class ListRealtorService {
    public static async execute(): Promise<IReturnRealtor[]> {
    
      const realtorRepo = AppDataSource.getRepository(Realtor);
      const findRealtors = await realtorRepo.find()

      if(!findRealtors){
        throw new AppError("Something is wrong", 400)
      }

      const returnRealtor: IReturnRealtor[] = findRealtors.map((realtoList)=>{
   
        let listProperties:IRealtorsId[] = [];

        realtoList.properties_created.forEach((item)=>{
          listProperties = [ ...listProperties,
            {
              id: item.id as string,
            }
           ]
          })
   
        let realtorReturn: IReturnRealtor = {
          ...realtoList,
          properties_created: listProperties
        }

         return realtorReturn
      })
   
    return returnRealtor
  }

}
  