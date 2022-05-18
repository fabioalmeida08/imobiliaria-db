import { AppDataSource } from '../../data-source'
import { Agency } from '../../entities/agency.entity'

export default class ListAllAgencyService {
  public static async execute(): Promise<Agency[]> {
    const AgencyRepo = AppDataSource.getRepository(Agency)
    const allAgency = await AgencyRepo.find()
    return allAgency
  }
}