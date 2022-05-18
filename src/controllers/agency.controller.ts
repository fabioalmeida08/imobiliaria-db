import { Request, Response } from "express";
import CreateAgencyService from "../services/agency/createAgency.service";

export default class AgencyController {
    public static async store(req: Request, res: Response) {
      const data = req.body;
      const createAgency = await CreateAgencyService.execute(data);
      return res.status(201).json(createAgency);
    }
  
    
  }