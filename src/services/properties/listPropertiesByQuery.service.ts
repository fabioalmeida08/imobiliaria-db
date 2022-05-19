import { AppDataSource } from "../../data-source";
import { Agency } from "../../entities/agency.entity";
import { Property } from "../../entities/property.entity";
import { Realtor } from "../../entities/realtor.entity";
import AppError from "../../errors/appError";

export default class ListPropertiesByQueryService {
  public static async execute(querys: any, id?: string) {
    const propertiesRepository = AppDataSource.getRepository(Property);
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

    let properties = await propertiesRepository.find();

    if (!properties) {
      throw new AppError("There aren't registered properties", 409);
    }

    Object.keys(querys).forEach((element) => {
      element === "type"
        ? (properties = properties.filter(({ type }) => type === querys.type))
        : false;
      element === "acquisition_type"
        ? (properties = properties.filter(
            ({ acquisition_type }) =>
              acquisition_type === querys.acquisition_type
          ))
        : false;
      element === "country"
        ? (properties = properties.filter(
            ({ country }) => country === querys.country
          ))
        : false;
      element === "state"
        ? (properties = properties.filter(
            ({ state }) => state === querys.state
          ))
        : false;
      element === "city"
        ? (properties = properties.filter(({ city }) => city === querys.city))
        : false;
      element === "price"
        ? (properties = properties.filter(
            ({ price }) => price === Number(querys.price)
          ))
        : false;
      element === "price_menor"
        ? (properties = properties.filter(
            ({ price }) => price <= Number(querys.price_menor)
          ))
        : false;
      element === "price_maior"
        ? (properties = properties.filter(
            ({ price }) => price >= Number(querys.price_maior)
          ))
        : false;
      element === "area"
        ? (properties = properties.filter(
            ({ area }) => area === Number(querys.area)
          ))
        : false;
      element === "area_menor"
        ? (properties = properties.filter(
            ({ area }) => area <= Number(querys.area_menor)
          ))
        : false;
      element === "area_maior"
        ? (properties = properties.filter(
            ({ area }) => area >= Number(querys.area_maior)
          ))
        : false;
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
