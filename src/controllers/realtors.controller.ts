import { Request, response, Response } from "express";
import CreateRealtorService from "../services/realtors/createRealtor.service";
import DeleteRealtorService from "../services/realtors/deleteRealtor.service";
import ListOneRealtorService from "../services/realtors/listOneRealtor.service";
import ListRealtorService from "../services/realtors/listRealtor.service";
import LoginRealtorService from "../services/realtors/loginRealtor.service";
import UpdateRealtorService from "../services/realtors/updateRealtor.service";

export default class RealtorsController {
  //store para criar um elemento
  public static async store(req: Request, res: Response) {
    const data = req.body;
    const createRealtor = await CreateRealtorService.execute(data);
    return res.status(201).json(createRealtor);
  }

  //index para listar todos os elementos
  public static async index(req: Request, res: Response) {
   // const authToken = req.headers.authorization
    const listRealtor = await ListRealtorService.execute();
    return res.status(201).json(listRealtor);
  }

  //show para listar apenas um elemento
  public static async show(req: Request, res: Response) {
    const data = req.body;

    const getRealtor = await ListOneRealtorService.execute(data);

    return res.status(200).json(getRealtor)
  }
  //update para atualizar um elemento
  public static async update(req: Request, res: Response) {
   const data = req.body
   const id = req.params.id
    data.id = id
    const updateRealtor = await UpdateRealtorService.execute(data)
    return res.status(200).json(updateRealtor)
  }
  //delete para deletar o elemento
  public static async delete(req: Request, res: Response) {
    const id = req.params.id

    const deleteRealtor = await DeleteRealtorService.execute(id)

    return res.status(200).json(deleteRealtor)

  }

  public static async login(req: Request, res: Response) {
    const data = req.body;
    const loginRealtor = await LoginRealtorService.execute(data);
    return res.status(201).json({acessToken : loginRealtor});
  }
}
