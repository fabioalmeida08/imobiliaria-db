import { AppDataSource } from '../../data-source'
import { Clients } from '../../entities/clients.entity'
import { ICreateClient } from '../../interfaces/client'

export default class CreateClientService {
  public static async execute(
    data: ICreateClient
  ): Promise<Clients> {
    const clientRepo = AppDataSource.getRepository(Clients)


    const newClient = clientRepo.create(data)
    await clientRepo.save(newClient)
    return newClient
  }
}
