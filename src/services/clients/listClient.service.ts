import { AppDataSource } from '../../data-source'
import { Clients } from '../../entities/clients.entity'

export default class ListClient {
  public static async execute(id: string) {
    const clientRepo = AppDataSource.getRepository(Clients)
    const client = await clientRepo.findOneBy({ id })
    return client
  }
}
