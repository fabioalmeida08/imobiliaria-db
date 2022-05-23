import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import AppError from "../../errors/appError";

const verifyAgencyTokenMiddleware = (req : Request , res : Response , next : NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError("Agency Authentication failed", 401)
    }
  
    const verifyToken = token.split(" ")[1];
  
    jwt.verify(verifyToken, "12720f6991bf17630654e468a3c99a5a", (err, decode) => {
      if (err) {
        throw new AppError("Agency Authentication failed", 401)
      }
    
      next();
    });

}
export default verifyAgencyTokenMiddleware