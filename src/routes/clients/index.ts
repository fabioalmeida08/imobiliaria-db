import { Router } from "express";
import ClientController from "../../controllers/client.controller";
import { expressYupMiddleware } from "express-yup-middleware";
import clientValidator from "../../validations/clients/clientValidation";
import verifyClientEmailMiddleware from "../../middlewares/clients/verifyEmail.middleware";
import AcessAuthMiddleware from "../../middlewares/realtorAuth/verifyShowRealtor";
import verifyAgencyTokenMiddleware from "../../middlewares/agency/verifyToken.middleware";
const clientRoute = Router()

clientRoute
  .route('/')
  .get(verifyAgencyTokenMiddleware, ClientController.index)
  .post(expressYupMiddleware({schemaValidator:clientValidator}), AcessAuthMiddleware, verifyClientEmailMiddleware,ClientController.store)

clientRoute
  .route('/:id')
  .get(AcessAuthMiddleware, ClientController.show)
  .patch(AcessAuthMiddleware, ClientController.update)
export default clientRoute
