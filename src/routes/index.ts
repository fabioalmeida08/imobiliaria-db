import { Router } from "express";
import salesRouter from "./sales";

const routes = Router();

routes.use("/property/:id/sales", salesRouter);

export default routes;
