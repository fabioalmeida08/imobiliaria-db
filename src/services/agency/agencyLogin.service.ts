import bcryptjs from "bcryptjs";
import { AppDataSource } from "../../data-source";
import { IAgency, IAgencyLogin } from "../../interfaces/agency";
import jwt from "jsonwebtoken";
import AppError from "../../errors/appError";
import { Agency } from "../../entities/agency.entity";
export default class LoginAgencyService {
  public static async execute(data: IAgencyLogin) {
    const { password, email } = data;

    const AgencyRepo = AppDataSource.getRepository(Agency);
    const findAgency = await AgencyRepo.findOneBy({ email });

    if (!findAgency) {
      throw new AppError("Email or password invalid", 401);
    }
    const comparePsswordHash = await bcryptjs.compare(
      password,
      findAgency.password
    );

    if (!comparePsswordHash) {
      throw new AppError("Email or password invalid", 401);
    }

    const generateToken = jwt.sign(
      { email: email },
      "12720f6991bf17630654e468a3c99a5a",
      {
        expiresIn: "24h",
        subject: findAgency.id,
      }
    );

    return {
      accessToken: generateToken,
      id: findAgency.id,
    };
  }
}
