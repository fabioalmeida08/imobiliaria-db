import { AppDataSource } from "../../data-source";
import { Property } from "../../entities/property.entity";
import AppError from "../../errors/appError";

export default class ShowPropertyService {
  public static async execute(id_property: string) {
    const propertyRepository = AppDataSource.getRepository(Property);

    const property = await propertyRepository.findOne({
      where: {
        id: id_property,
      },
    });

    if (!property) {
      throw new AppError("Property not found");
    }

    return property;
  }
}
