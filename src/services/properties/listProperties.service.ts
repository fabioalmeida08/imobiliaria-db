import { AppDataSource } from "../../data-source";
import { Agency } from "../../entities/agency.entity";
import { Property } from "../../entities/property.entity";
import { Realtor } from "../../entities/realtor.entity";
import AppError from "../../errors/appError";

export default class ListPropertiesService {
  public static async execute(id?: string) {
    const propertyRepository = AppDataSource.getRepository(Property);
    const agencyRepository = AppDataSource.getRepository(Agency);
    const realtorRepository = AppDataSource.getRepository(Realtor);

    const properties = await propertyRepository.find();

    if (!properties) {
      throw new AppError("There aren't registered properties", 409);
    }

    const agency = await agencyRepository.findOne({
      where: {
        id,
      },
    });

    const realtor = await realtorRepository.findOne({
      where: {
        id,
      },
    });

    if ((!agency && !realtor) || !id) {
      const availableProperties = properties.map(
        ({
          country,
          state,
          city,
          type,
          area,
          complement,
          acquisition_type,
          price,
          description,
        }) => {
          return {
            country,
            state,
            city,
            type,
            area,
            complement,
            acquisition_type,
            price,
            description,
          };
        }
      );
      return availableProperties;
    }

    return properties;
  }
}
