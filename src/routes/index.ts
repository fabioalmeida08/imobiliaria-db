import { Router } from "express";
import propertiesRouter from "./properties";

const routes = Router();

routes.use("/properties", propertiesRouter);

export default routes;
