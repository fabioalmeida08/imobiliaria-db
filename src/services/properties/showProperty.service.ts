import { AppDataSource } from "../../data-source";
import { Agency } from "../../entities/agency.entity";
import { Property } from "../../entities/property.entity";
import { Realtor } from "../../entities/realtor.entity";
import AppError from "../../errors/appError";

export default class ShowPropertyService {
  public static async execute(id_property: string, id?: string) {
    const propertyRepository = AppDataSource.getRepository(Property);
    const agencyRepository = AppDataSource.getRepository(Agency);
    const realtorRepository = AppDataSource.getRepository(Realtor);

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

    if (!agency && !realtor) {
      const property = await propertyRepository.findOne({
        where: {
          id: id_property,
        },
      });

      const {
        country,
        state,
        city,
        type,
        area,
        complement,
        acquisition_type,
        price,
        description,
      } = property as Property;
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

    const property = await propertyRepository.findOne({
      where: {
        id: id_property,
      },
    });

    return property;
  }
}
