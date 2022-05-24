import { instanceToPlain } from "class-transformer";
import { AppDataSource } from "../../data-source";
import { Clients } from "../../entities/clients.entity";
import { Property } from "../../entities/property.entity";
import { Realtor } from "../../entities/realtor.entity";
import AppError from "../../errors/appError";
import { ReturnedPropertyList } from "./listPropertiesByQuery.service";

export default class ListPropertiesService {
  public static async execute(id?: string) {
    const propertyRepository = AppDataSource.getRepository(Property);
    const clientRepository = AppDataSource.getRepository(Clients);
    const realtorRepository = AppDataSource.getRepository(Realtor);

    const properties = await propertyRepository.find();

    if (!properties) {
      throw new AppError("There aren't registered properties", 409);
    }

    if (!id) {
      return instanceToPlain(properties);
    }

    const clients = await clientRepository.find();
    const realtors = await realtorRepository.find();

    const propertiesList = properties.map((property) => {
      const actualClient = clients.find(({ properties }) => {
        return properties.some((prop) => prop.id === property.id);
      });

      const actualRealtor = realtors.find(({ properties_created }) => {
        return properties_created.some((prop) => prop.id === property.id);
      });

      const returnedProperty: ReturnedPropertyList = {
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

      return returnedProperty;
    });

    return propertiesList;
  }
}
