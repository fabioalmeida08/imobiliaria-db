import { Router } from "express";
import SalesController from "../../controllers/sales.controller";

const salesRoute = Router();

salesRoute.route("/").post(SalesController.store).get(SalesController.index);

export default salesRoute;
