import { Request, Response } from 'express'
import CreateClientService from '../services/clients/createClient.service'
import ListAllClients from '../services/clients/listAllClient.service'
export default class ClientController {
  public static async store(req: Request, res: Response) {
    const data = req.body
    const newClient = await CreateClientService.execute(
      data
    )
    return res.status(201).json(newClient)
  }
  public static async index(req: Request, res: Response) {
    const allClients = await ListAllClients.execute()
    return res.status(201).json(allClients)
  }
  public static async show(req: Request, res: Response) {}
}
