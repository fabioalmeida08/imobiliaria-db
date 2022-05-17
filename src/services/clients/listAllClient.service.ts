import { AppDataSource } from "../../data-source";
import {} from '../../entities'

export default class ListAllClients {
  public static async execute() : Promise<{
    const clientRepo = AppDataSource.getRepository()
    const allClients = clientRepo.find()
    return allClients
  }
}