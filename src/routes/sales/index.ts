import { Router } from "express"
import { expressYupMiddleware } from "express-yup-middleware"
import SalesController from "../../controllers/sales.controller"
import salesValidator from "../../validations/sales"

const salesRoute = Router()

salesRoute
  .route("/:id")
  .get(SalesController.show)
  .patch(SalesController.update)

salesRoute.route("")
  .get(SalesController.index)
  .post(SalesController.store)

export default salesRoute
