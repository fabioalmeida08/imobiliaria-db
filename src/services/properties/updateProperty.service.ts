import { AppDataSource } from "../../data-source";
import { Clients } from "../../entities/clients.entity";
import { Property } from "../../entities/property.entity";
import { Realtor } from "../../entities/realtor.entity";
import AppError from "../../errors/appError";
import { UpdateProperty } from "../../interfaces/properties";
import { ReturnedPropertyList } from "./listPropertiesByQuery.service";

export default class UpdatePropertyService {
  public static async execute(
    data: UpdateProperty
  ): Promise<ReturnedPropertyList> {
    const propertyRepository = AppDataSource.getRepository(Property);
    const clientRepository = AppDataSource.getRepository(Clients);
    const realtorRepository = AppDataSource.getRepository(Realtor);

    const property = await propertyRepository.findOne({
      where: {
        id: data.id,
      },
    });

    if (!property) {
      throw new AppError("Property not found");
    }

    data.street ? (property.street = data.street) : property.street;
    data.city ? (property.city = data.city) : property.city;
    data.state ? (property.state = data.state) : property.state;
    data.postal_code
      ? (property.postal_code = data.postal_code)
      : property.postal_code;
    data.country ? (property.country = data.country) : property.country;
    data.area ? (property.area = data.area) : property.area;
    data.complement
      ? (property.complement = data.complement)
      : property.complement;
    data.availability
      ? (property.availability = data.availability)
      : data.availability === false
      ? (property.availability = data.availability)
      : property.availability;
    data.type ? (property.type = data.type) : property.type;
    data.acquisition_type
      ? (property.acquisition_type = data.acquisition_type)
      : property.acquisition_type;
    data.price ? (property.price = data.price) : property.price;
    data.bathroom_number
      ? (property.bathroom_number = data.bathroom_number)
      : property.bathroom_number;
    data.bedroom_number
      ? (property.bedroom_number = data.bedroom_number)
      : property.bedroom_number;
    data.parking_spaces
      ? (property.parking_spaces = data.parking_spaces)
      : property.parking_spaces;
    data.elevator ? (property.elevator = data.elevator) : property.elevator;
    data.party_hall
      ? (property.party_hall = data.party_hall)
      : data.party_hall === false
      ? (property.party_hall = data.party_hall)
      : property.party_hall;
    data.party_area
      ? (property.party_area = data.party_area)
      : data.party_area === false
      ? (property.party_area = data.party_area)
      : property.party_area;
    data.gtill
      ? (property.gtill = data.gtill)
      : data.gtill === false
      ? (property.gtill = data.gtill)
      : property.gtill;
    data.swimming_pool
      ? (property.swimming_pool = data.swimming_pool)
      : data.swimming_pool === false
      ? (property.swimming_pool = data.swimming_pool)
      : property.swimming_pool;
    data.gym
      ? (property.gym = data.gym)
      : data.gym === false
      ? (property.gym = data.gym)
      : property.gym;
    data.playground
      ? (property.playground = data.playground)
      : data.playground === false
      ? (property.playground = data.playground)
      : property.playground;
    data.sports_court
      ? (property.sports_court = data.sports_court)
      : data.sports_court === false
      ? (property.sports_court = data.sports_court)
      : property.sports_court;
    data.description
      ? (property.description = data.description)
      : property.description;

    if (data.id_client) {
      const client = await clientRepository.findOne({
        where: {
          id: data.id_client,
        },
      });
      if (client) {
        property.client_seller = client;
      }
    }

    if (data.id_realtor) {
      const realtor = await realtorRepository.findOne({
        where: {
          id: data.id_realtor,
        },
      });
      if (realtor) {
        property.realtor_creator = realtor;
      }
    }

    await propertyRepository.save(property);

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
