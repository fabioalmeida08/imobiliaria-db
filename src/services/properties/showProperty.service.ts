import { instanceToPlain } from "class-transformer";
import { AppDataSource } from "../../data-source";
import { Clients } from "../../entities/clients.entity";
import { Property } from "../../entities/property.entity";
import { Realtor } from "../../entities/realtor.entity";
import AppError from "../../errors/appError";
import { ReturnedPropertyList } from "./listPropertiesByQuery.service";

export default class ShowPropertyService {
  public static async execute(id_property: string, id?: string) {
    const propertyRepository = AppDataSource.getRepository(Property);
    const clientRepository = AppDataSource.getRepository(Clients);
    const realtorRepository = AppDataSource.getRepository(Realtor);

    const property = await propertyRepository.findOne({
      where: {
        id: id_property,
      },
    });

    if (!property) {
      throw new AppError("Property not found");
    }

    if (!id) {
      return instanceToPlain(property);
    }

    const clients = await clientRepository.find();
    const realtors = await realtorRepository.find();

    const actualClient = clients.find(({ properties }) => {
      return properties.some((prop) => prop.id === property.id);
    });

    const actualRealtor = realtors.find(({ properties_created }) => {
      return properties_created.some((prop) => prop.id === property.id);
    });

    const propertyReturned: ReturnedPropertyList = {
      ...property,
      client_seller: {
        id: actualClient?.id as string,
        name: actualClient?.name as string,
      },
      realtor_creator: {
        id: actualRealtor?.id as string,
        name: actualRealtor?.name as string,
      },
    };

    return propertyReturned;
  }
}
