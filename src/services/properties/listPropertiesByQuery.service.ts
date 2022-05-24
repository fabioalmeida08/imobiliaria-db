import { instanceToPlain } from "class-transformer";
import { AppDataSource } from "../../data-source";
import { Clients } from "../../entities/clients.entity";
import { Images } from "../../entities/images.entity";
import { Property } from "../../entities/property.entity";
import { Realtor } from "../../entities/realtor.entity";
import AppError from "../../errors/appError";

export interface IdName {
  id: string;
  name: string;
}

export interface ReturnedPropertyList {
  id: string;
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  area: number;
  complement: string;
  availability: boolean;
  type: string;
  acquisition_type: string;
  price: number;
  bathroom_number: number;
  bedroom_number: number;
  parking_spaces: number;
  elevator: number;
  party_hall: boolean;
  party_area: boolean;
  gtill: boolean;
  swimming_pool?: boolean;
  gym: boolean;
  playground: boolean;
  sports_court: boolean;
  description: string;
  client_seller: IdName;
  realtor_creator: IdName;
  image: Images[];
}

export default class ListPropertiesByQueryService {
  public static async execute(querys: any, id?: string) {
    const propertiesRepository = AppDataSource.getRepository(Property);
    const clientRepository = AppDataSource.getRepository(Clients);
    const realtorRepository = AppDataSource.getRepository(Realtor);

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
      element === "bathroom"
        ? (properties = properties.filter(
            ({ bathroom_number }) => bathroom_number === Number(querys.bathroom)
          ))
        : false;
      element === "bathroom_maior"
        ? (properties = properties.filter(
            ({ bathroom_number }) =>
              bathroom_number <= Number(querys.bathroom_maior)
          ))
        : false;
      element === "bathroom_menor"
        ? (properties = properties.filter(
            ({ bathroom_number }) =>
              bathroom_number >= Number(querys.bathroom_menor)
          ))
        : false;
      element === "bedroom"
        ? (properties = properties.filter(
            ({ bedroom_number }) => bedroom_number === Number(querys.bedroom)
          ))
        : false;
      element === "bedroom_menor"
        ? (properties = properties.filter(
            ({ bedroom_number }) =>
              bedroom_number <= Number(querys.bedroom_menor)
          ))
        : false;
      element === "bedroom_maior"
        ? (properties = properties.filter(
            ({ bedroom_number }) =>
              bedroom_number >= Number(querys.bedroom_maior)
          ))
        : false;
    });

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
