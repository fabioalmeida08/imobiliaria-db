import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppDataSource } from "../../data-source";
import { Agency } from "../../entities/agency.entity";
import { Realtor } from "../../entities/realtor.entity";
import AppError from "../../errors/appError";

const authUpdatePropertyMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  const { id_property } = req.params;

  if (!token) {
    throw new AppError("Missing authorization token", 401);
  }

  const verifyToken = token.split(" ")[1];

  const secret = process.env.SECRET_KEY || "c5e728ad9311059cc3c09092b6a7aca6";

  const decoded = verify(verifyToken, secret);

  const { sub } = decoded;

  const agencyRepository = AppDataSource.getRepository(Agency);
  const agency = await agencyRepository.findOne({
    where: {
      id: sub as string,
    },
  });

  if (agency) {
    next();
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

  if (!realtor?.properties_created.some(({ id }) => id === id_property)) {
    throw new AppError(
      "Only the responsible realtor can access this feature",
      401
    );
  }

  next();
};

export default authUpdatePropertyMiddleware;
