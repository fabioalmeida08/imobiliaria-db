import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppDataSource } from "../../data-source";
import { Agency } from "../../entities/agency.entity";
import AppError from "../../errors/appError";

const authDeletePropertyMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new AppError("Missing authorization token", 401);
  }

  const verifyToken = token.split(" ")[1];

  const secret = String(process.env.JWT_SECRET_KEY)

  const decoded = verify(verifyToken, secret);

  const { sub } = decoded;

  const agencyRepository = AppDataSource.getRepository(Agency);
  const agency = await agencyRepository.findOne({
    where: {
      id: sub as string,
    },
  });

  if (!agency) {
    throw new AppError("Only the admin can access this feature", 401);
  }
  next();
};

export default authDeletePropertyMiddleware;
