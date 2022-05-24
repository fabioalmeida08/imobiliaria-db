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

  jwt.verify(
    verifyToken,
    String(process.env.JWT_SECRET_KEY),
    (err, decode) => {
      if (err) {
        throw new AppError("Realtor Authentication failed", 401);
      }

      next();
    }
  );
};
export default realtorAuthMiddleware;
