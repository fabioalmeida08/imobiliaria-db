import { AppDataSource } from '../../data-source'
import { Clients } from '../../entities/clients.entity'
import { IUpdatedClient } from '../../interfaces/client'

export default class UpdatedClient {
  public static async execute(
    id: string,
    data: IUpdatedClient
  ) {
    const clientRepo = AppDataSource.getRepository(Clients)
    const client = await clientRepo.findOneBy({ id })
    await clientRepo.save({ ...client, ...data })
    const upClient = await clientRepo.findOneBy({id})

    return upClient

  }
}
