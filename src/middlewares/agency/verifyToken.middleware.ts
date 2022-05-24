import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { string } from "yup";
import AppError from "../../errors/appError";

const verifyAgencyTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new AppError("Agency Authentication failed", 401);
  }

  const verifyToken = token.split(" ")[1];

  jwt.verify(
    verifyToken,
    process.env.JWT_SECRET_KEY as string,
    (err, decode) => {
      if (err) {
        throw new AppError("Agency Authentication failed", 401);
      }

      next();
    }
  );
};
export default verifyAgencyTokenMiddleware;
