import { NextFunction, Request, Response } from "express";
import jwt, { verify } from "jsonwebtoken";
import { AppDataSource } from "../../data-source";
import { Agency } from "../../entities/agency.entity";
import { Realtor } from "../../entities/realtor.entity";
import AppError from "../../errors/appError";

const AcessAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new AppError("Missing Authorization token",401)
  }

  const verifyToken = token?.split(" ")[1];
   if(!verifyToken || verifyToken.length <=1){
    throw new AppError("Missing Authorization token",401)
   }
  const secret = String(process.env.JWT_SECRET_KEY)

  const decoded = verify(verifyToken, secret);

  const { sub } = decoded;

  const agencyRepository = AppDataSource.getRepository(Agency);
  const agency = await agencyRepository.findOne({
    where: {
      id: String(sub),
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
  next();
};
export default AcessAuthMiddleware;
