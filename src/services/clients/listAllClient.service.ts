import { AppDataSource } from '../../data-source'
import { Clients } from '../../entities/clients.entity'
import AppError from '../../errors/appError'

export default class ListAllClients {
  public static async execute(): Promise<Clients[]> {
    const clientRepo = AppDataSource.getRepository(Clients)
    const allClients = await clientRepo.find()
    if(!allClients){
      throw new AppError("No client register")
    }
    return allClients
  }
}
