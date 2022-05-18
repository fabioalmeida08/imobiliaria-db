import { AppDataSource } from '../../data-source'
import { Clients } from '../../entities/clients.entity'

export default class ListAllClients {
  public static async execute(): Promise<Clients[]> {
    const clientRepo = AppDataSource.getRepository(Clients)
    const allClients = await clientRepo.find()
    return allClients
  }
}
