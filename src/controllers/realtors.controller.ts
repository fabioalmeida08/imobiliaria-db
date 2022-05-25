import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import CreateRealtorService from "../services/realtors/createRealtor.service";
import DeleteRealtorService from "../services/realtors/deleteRealtor.service";
import ListOneRealtorService from "../services/realtors/listOneRealtor.service";
import ListRealtorService from "../services/realtors/listRealtor.service";
import LoginRealtorService from "../services/realtors/loginRealtor.service";
import UpdateRealtorService from "../services/realtors/updateRealtor.service";

export default class RealtorsController {
  public static async store(req: Request, res: Response) {
    const data = req.body;
    const createRealtor = await CreateRealtorService.execute(data);

    return res.status(201).json(instanceToPlain(createRealtor));
  }

  public static async index(req: Request, res: Response) {
    const listRealtor = await ListRealtorService.execute();
    return res.status(200).json(listRealtor);
  }

  public static async show(req: Request, res: Response) {
    const { id } = req.params;

    const getRealtor = await ListOneRealtorService.execute(id);

    return res.status(200).json(getRealtor);
  }

  public static async update(req: Request, res: Response) {
    const data = req.body;
    const id = req.params.id;
    data.id = id;
    const updateRealtor = await UpdateRealtorService.execute(data);
    return res.status(200).json(updateRealtor);
  }

  public static async delete(req: Request, res: Response) {
    const id = req.params.id;

    await DeleteRealtorService.execute(id);

    return res.status(204).json();
  }

  public static async login(req: Request, res: Response) {
    const data = req.body;
    const loginRealtor = await LoginRealtorService.execute(data);
    return res.status(201).json(loginRealtor);
  }
}
