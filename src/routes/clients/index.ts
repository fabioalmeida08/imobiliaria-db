import { Router } from "express";
import ClientController from "../../controllers/client.controller";
const clientRoute = Router()

clientRoute
  .route('/')
  .get(ClientController.index)
  .post(ClientController.store)

clientRoute
  .route('/:id')
  .get(ClientController.show)

export default clientRoute
