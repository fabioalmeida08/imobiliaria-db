import { Request, Response } from "express";
import CreateAgencyService from "../services/agency/createAgency.service";
import ListOneAgencyService from "../services/agency/listOneAgency.service";

export default class AgencyController {
    public static async store(req: Request, res: Response) {
      const data = req.body;
      const createAgency = await CreateAgencyService.execute(data);
      return res.status(201).json(createAgency);
    }
  
    public static async show(req: Request, res: Response) {
      const {id} = req.body;
  
      const getRealtor = await ListOneAgencyService.execute(id);
  
      return res.status(200).json(getRealtor)
    }

    
    
  }