import { AppDataSource } from "../../data-source";

export default class ListPropertiesService {
  public static async execute(id?: string): Promise<Property[]> {
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
      //   const properties = await propertyRepository.find({
      //     where: { availability: true },
      //   });
      //   const availableProperties = properties.map(
      //     ({
      //       country,
      //       state,
      //       city,
      //       type,
      //       area,
      //       complement,
      //       acquisition_type,
      //       price,
      //     }) => {
      //       country, state, city, type, area, complement, acquisition_type, price;
      //     }
      //   );
      //   return availableProperties;
    }

    const properties = await propertyRepository.find();

    return properties;
  }
}
