import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import AppError from "../../errors/appError";

const realtorAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new AppError("Realtor Authentication failed", 401);
  }

  const verifyToken = token.split(" ")[1];

  jwt.verify(verifyToken, "c5e728ad9311059cc3c09092b6a7aca6", (err, decode) => {
    if (err) {
      throw new AppError("Realtor Authentication failed", 401);
    }

    next();
  });
};
export default realtorAuthMiddleware;
