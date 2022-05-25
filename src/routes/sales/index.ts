import { Router } from "express"
import SalesController from "../../controllers/sales.controller"

const salesRoute = Router()

salesRoute
  .route("/:id")
  .get(SalesController.show)
  .patch(SalesController.update)

salesRoute.route("")
  .get(SalesController.index)
  .post(SalesController.store)

export default salesRoute
