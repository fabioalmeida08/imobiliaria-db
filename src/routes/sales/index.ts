import { Router } from "express"
import SalesController from "../../controllers/sales.controller"

const salesRoute = Router()

salesRoute.route("/:id/sale").post(SalesController.store)

salesRoute.route("/sale/:id").get(SalesController.show)

salesRoute.route("/sale").get(SalesController.index)

export default salesRoute
