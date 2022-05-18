import { DeleteResult } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Property } from "../../entities/property.entity";
import AppError from "../../errors/appError";

export default class DeletePropertyService {
  public static async execute(id: string): Promise<DeleteResult> {
    const propertyRepository = AppDataSource.getRepository(Property);

    const property = await propertyRepository.findOne({
      where: {
        id,
      },
    });

    if (!property) {
      throw new AppError("Property not found");
    }

    return propertyRepository.delete(id);
  }
}
