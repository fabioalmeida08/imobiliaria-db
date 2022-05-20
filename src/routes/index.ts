import { Router } from "express";
import agencyRoute from "./agency";
import propertiesRouter from "./properties";
import clientRoute from "./clients";
import realtorRoute from "./realtors";

const routes = Router();

routes.use("/agency", agencyRoute)
routes.use("/clients", clientRoute);
routes.use("/realtor", realtorRoute);
routes.use("/properties", propertiesRouter);

export default routes;
