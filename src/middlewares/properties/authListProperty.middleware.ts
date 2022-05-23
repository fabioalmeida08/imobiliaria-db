import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../../data-source";
import { Agency } from "../../entities/agency.entity";
import { Realtor } from "../../entities/realtor.entity";
import AppError from "../../errors/appError";

const authListPropertyMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    return next();
  } else {
    const token = req.headers.authorization;

    const verifyToken = token?.split(" ")[1];

    const secret = process.env.SECRET_KEY || "c5e728ad9311059cc3c09092b6a7aca6";

    const decoded = jwt.verify(verifyToken as string, secret);

    const { sub } = decoded;

    const agencyRepository = AppDataSource.getRepository(Agency);
    const agency = await agencyRepository.findOne({
      where: {
        id: sub as string,
      },
    });

    if (agency) {
      req.id_agency = sub as string;
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

    req.id_realtor = sub as string;
    next();
  }
};

export default authListPropertyMiddleware;
