import { DeleteResult } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Realtor } from "../../entities/realtor.entity";
import AppError from "../../errors/appError";

export default class DeleteRealtorService {
  public static async execute(id: string): Promise<DeleteResult> {
    const realtorRepo = AppDataSource.getRepository(Realtor);
    const realtorDelete = await realtorRepo.findOne({
      where: {
        id,
      },
    });

    if (!realtorDelete) {
      throw new AppError("Property not found");
    }
    return realtorRepo.delete(id);
  }
}
