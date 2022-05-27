import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import LoginAgencyService from "../services/agency/agencyLogin.service";
import CreateAgencyService from "../services/agency/createAgency.service";
import ListAllAgencyService from "../services/agency/listAllAgency.service";
import ListOneAgencyService from "../services/agency/listOneAgency.service";
import UpdateAgencyService from "../services/agency/updateAgency.service";

export default class AgencyController {
    public static async store(req: Request, res: Response) {
      const data = req.body;
      const createAgency = await CreateAgencyService.execute(data);
      return res.status(201).json(instanceToPlain(createAgency));
    }
  
    public static async show(req: Request, res: Response) {
      const {id} = req.body;
  
      const getAgency = await ListOneAgencyService.execute(id);
  
      return res.status(200).json(instanceToPlain(getAgency))
    }

    public static async index(req: Request, res: Response) {
     // const authToken = req.headers.authorization
      const listAgency = await ListAllAgencyService.execute();
      return res.status(200).json(instanceToPlain(listAgency));
    }

    public static async update(req: Request, res: Response) {
     const data = req.body
     const id = req.params.id
      data.id = id
      const updateAgency = await UpdateAgencyService.execute(data);
      return res.status(200).json(instanceToPlain(updateAgency))
    }
  
    public static async login(req: Request, res: Response) {
      const data = req.body;
      const loginAgency = await LoginAgencyService.execute(data);
      return res.status(200).json(loginAgency);
    }
    
  }