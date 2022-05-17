import { Router } from "express";
import ClientController from "../../controllers/client.controller";
import { expressYupMiddleware } from "express-yup-middleware";
import clientValidator from "../../validations/clients/clientValidation";
const clientRoute = Router()

clientRoute
  .route('/')
  .get(expressYupMiddleware({schemaValidator:clientValidator}) ,ClientController.index)
  .post(ClientController.store)

clientRoute
  .route('/:id')
  .get(ClientController.show)

export default clientRoute
