import { Request,Response,NextFunction } from "express";
import { AppDataSource } from "../../data-source";
import { Agency } from "../../entities/agency.entity";

const verifyAgencyEmailMiddleware = async (req:Request,res:Response,next:NextFunction) => {
  const {email} = req.body

  const agencyRepo = AppDataSource.getRepository(Agency)

  const agency = await agencyRepo.find()

  if(agency){
    return res.status(400).json('Agency Already Exists')
  }

  return next()
}

export default verifyAgencyEmailMiddleware