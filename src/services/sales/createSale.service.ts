import { ICreateSale } from "../../interfaces/sales"
import { AppDataSource } from "../../data-source"
import { In } from "typeorm"
import AppError from "../../errors/appError"
import { Sales } from "../../entities/sales.entity"
import { Realtor } from "../../entities/realtor.entity"
import { Clients } from "../../entities/clients.entity"
import { Property } from "../../entities/property.entity"

export default class CreateSaleService {
  public static async execute(data: ICreateSale): Promise<Sales> {
    const salesRepo = AppDataSource.getRepository(Sales)
    const realtorsRepo = AppDataSource.getRepository(Realtor)
    const clientsRepo = AppDataSource.getRepository(Clients)
    const propertyRepo = AppDataSource.getRepository(Property)

    const realtorsList = await realtorsRepo.findBy({
      id: In(data.realtors),
    })
    if (!realtorsList[data.realtors.length - 1]) {
      throw new AppError("Invalid list of realtors")
    }

    const client = await clientsRepo.findOne({
      where: { id: data.id_client_buyer },
    })
    if (!client) {
      throw new AppError("Invalid buyer client")
    }

    const property = await propertyRepo.findOne({
      where: { id: data.id_property },
    })
    if (!client) {
      throw new AppError("Invalid property")
    }

    const newSale = new Sales()
    newSale.selling_value = data.selling_value
    newSale.down_payment = data.down_payment
    newSale.description = data.description
    newSale.realtors = realtorsList as Realtor[]
    newSale.client_buyer = client as Clients
    newSale.property = property as Property

    salesRepo.create(newSale)
    await salesRepo.save(newSale)

    return newSale
  }
}
