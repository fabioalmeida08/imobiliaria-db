import { AppDataSource } from '../../data-source'
import { Clients } from '../../entities/clients.entity'
import AppError from '../../errors/appError'

export default class ListClient {
  public static async execute(id: string) {
    const clientRepo = AppDataSource.getRepository(Clients)
    const client = await clientRepo.findOneBy({ id })
    if(!client){
      throw new AppError("Client not found")
    }
    return client
  }
}
