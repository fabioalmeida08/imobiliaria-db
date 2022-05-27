import { Router } from "express"
import { expressYupMiddleware } from "express-yup-middleware"
import SalesController from "../../controllers/sales.controller"
import salesValidator from "../../validations/sales"
import verifyAgencyTokenMiddleware from "../../middlewares/agency/verifyToken.middleware";
import AcessAuthMiddleware from "../../middlewares/realtorAuth/verifyShowRealtor";

const salesRoute = Router()

salesRoute
  .route("/:id")
  .get(AcessAuthMiddleware, SalesController.show)
  .patch(verifyAgencyTokenMiddleware, SalesController.update)

salesRoute.route("")
  .get(verifyAgencyTokenMiddleware, SalesController.index)
  .post(AcessAuthMiddleware, SalesController.store)

export default salesRoute
