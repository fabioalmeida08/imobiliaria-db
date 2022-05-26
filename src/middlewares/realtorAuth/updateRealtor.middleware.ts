import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppDataSource } from "../../data-source";
import { Agency } from "../../entities/agency.entity";
import { Realtor } from "../../entities/realtor.entity";
import AppError from "../../errors/appError";

const updateRealtorMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  const { id } = req.params;

  if (!token) {
    throw new AppError("Missing authorization token", 401);
  }

  const verifyToken = token.split(" ")[1];

  const secret = String(process.env.JWT_SECRET_KEY);

  const decoded = verify(verifyToken, secret);

  const { sub } = decoded;

  const agencyRepository = AppDataSource.getRepository(Agency);
  const agency = await agencyRepository.findOne({
    where: {
      id: sub as string,
    },
  });

  if (agency) {
    return next();
  }

  const realtorRepository = AppDataSource.getRepository(Realtor);
  const realtor = await realtorRepository.findOne({
    where: {
      id: sub as string,
    },
  });

  if (!agency && !realtor) {
    throw new AppError("Invalid token", 401);
  }

  if (realtor?.id !== id) {
    throw new AppError(
      "Only the responsible realtor can access this feature",
      401
    );
  }

  return next();
};

export default updateRealtorMiddleware;
