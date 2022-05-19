import { Router } from "express";
import ClientController from "../../controllers/client.controller";
import { expressYupMiddleware } from "express-yup-middleware";
import clientValidator from "../../validations/clients/clientValidation";
import verifyClientEmailMiddleware from "../../middlewares/clients/verifyEmail.middleware";
const clientRoute = Router()

clientRoute
  .route('/')
  .get(ClientController.index)
  .post(expressYupMiddleware({schemaValidator:clientValidator}),verifyClientEmailMiddleware,ClientController.store)

clientRoute
  .route('/:id')
  .get(ClientController.show)
  .patch(ClientController.update)
export default clientRoute
