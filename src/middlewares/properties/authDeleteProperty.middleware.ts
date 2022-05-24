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
    return res.status(401).json({
      status: "error",
      statusCode: 401,
      message: "Missing authorization token",
    });
  }

  const verifyToken = token.split(" ")[1];

  const secret =
    process.env.JWT_SECRET_KEY || "c5e728ad9311059cc3c09092b6a7aca6";

  const decoded = verify(verifyToken, secret);

  const { sub } = decoded;

  const agencyRepository = AppDataSource.getRepository(Agency);
  const agency = await agencyRepository.findOne({
    where: {
      id: sub as string,
    },
  });

  if (!agency) {
    return res.status(401).json({
      status: "error",
      statusCode: 401,
      message: "Only the admin can access this feature",
    });
  }
  next();
};

export default authDeletePropertyMiddleware;
