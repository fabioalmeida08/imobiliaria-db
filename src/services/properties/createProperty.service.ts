import { AppDataSource } from "../../data-source";
import { CreateProperty } from "../../interfaces/properties";

export default class CreatePropertyService {
  public static async execute({
    street,
    city,
    state,
    postal_code,
    country,
    area,
    complement,
    type,
    acquisition_type,
    price,
    availability,
    id_client,
    id_realtor,
  }: CreateProperty): Promise<Property> {
    const propertyRepository = AppDataSource.getRepository(Property);

    const property = new Property();
    property.street = street;
    property.city = city;
    property.state = state;
    property.postal_code = postal_code;
    property.country = country;
    property.area = area;
    property.complement = complement;
    property.type = type;
    property.acquisition_type = acquisition_type;
    property.price = price;
    property.availability = availability;
    property.id_client = id_client;
    property.id_realtor = id_realtor;

    propertyRepository.create(property);
    await propertyRepository.save(property);

    return property;
  }
}
