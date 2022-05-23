import { Router } from "express"
import SalesController from "../../controllers/sales.controller"

const salesRoute = Router()

salesRoute
  .route("/:id")
  .post(SalesController.store)
  .get(SalesController.show)
  .patch(SalesController.update)

salesRoute.route("").get(SalesController.index)

export default salesRoute
