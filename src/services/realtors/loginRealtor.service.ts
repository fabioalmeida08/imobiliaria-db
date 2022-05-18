import bcryptjs from "bcryptjs";
import { AppDataSource } from "../../data-source";
import { ILoginRealtor } from "../../interfaces/realtor";
import jwt from "jsonwebtoken";
import AppError from "../../errors/appError";
import { Realtor } from "../../entities/realtor.entity";
export default class LoginRealtorService {
  public static async execute(data : ILoginRealtor) {
    const { password, email } = data;

    const realtorRepo = AppDataSource.getRepository(Realtor);
    const realtors = await realtorRepo.find();
    const findRealtor = realtors.find((user) => user.email === email);

    if (!findRealtor) {
      throw new AppError("Email or password invalid", 401);
    }
    const comparePsswordHash = await bcryptjs.compare(
      password,
      findRealtor.password
    );

    if (!comparePsswordHash) {
      throw new AppError("Email or password invalid", 401);
    }

    const generateToken = jwt.sign(
      { email: email },
      "c5e728ad9311059cc3c09092b6a7aca6",
      {
        expiresIn: "24h",
        subject: findRealtor.id,
      }
    );

    return generateToken;
  }
}
