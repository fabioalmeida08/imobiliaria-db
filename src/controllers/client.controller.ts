import { Request, Response } from 'express'
import CreateClientService from '../services/clients/createClient.service'
import ListAllClients from '../services/clients/listAllClient.service'
import ListClient from '../services/clients/listClient.service'
import UpdateClient from '../services/clients/updateClient.service'

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
    return res.status(200).json(allClients)
  }
  public static async show(req: Request, res: Response) {
    const {id} = req.params
    const client = await ListClient.execute(id)
    return res.status(200).json(client)
  }
  public static async update(req: Request, res: Response) {
    const {id} = req.params
    const data = req.body
    const updatedclient = await UpdateClient.execute(id,data)
    return res.status(200).json(updatedclient)
  }
}
