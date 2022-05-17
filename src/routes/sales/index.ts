import { Router } from "express";
import SalesController from "../../controllers/sales.controller";

const salesRouter = Router();

salesRouter.route("/").post(SalesController.store).get(SalesController.index);

export default salesRouter;
