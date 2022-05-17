import { AppDataSource } from "../../data-source";
import {clients} from '../../entities'
import { ICreateClient } from "../../interfaces/client";

export default class CreateClientService {
  public static async execute (data:ICreateClient): Promise<Client> {
    const clientRepo = AppDataSource.getRepository()
    const newClient = clientRepo.create(data)
    await clientRepo.save(newClient)
    return newClient
  }
}