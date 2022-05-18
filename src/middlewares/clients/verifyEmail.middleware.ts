import { Request,Response,NextFunction } from "express";
import { AppDataSource } from "../../data-source";
import { Clients } from "../../entities/clients.entity";

const verifyClientEmailMiddleware = async (req:Request,res:Response,next:NextFunction) => {
  const {email} = req.body

  const clientRepo = AppDataSource.getRepository(Clients)

  const client = await clientRepo.findOneBy({email})

  if(client){
    return res.status(400).json('Email Already Exists')
  }

  return next()
}

export default verifyClientEmailMiddleware