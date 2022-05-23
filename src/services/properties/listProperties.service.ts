import { AppDataSource } from "../../data-source";
import { Property } from "../../entities/property.entity";
import AppError from "../../errors/appError";

export default class ListPropertiesService {
  public static async execute() {
    const propertyRepository = AppDataSource.getRepository(Property);

    const properties = await propertyRepository.find();

    if (!properties) {
      throw new AppError("There aren't registered properties", 409);
    }

    return properties;
  }
}
