import { Router } from "express";
import clientRoute from "./clients";
import realtorRoute from "./realtors";
const routes = Router()
routes.use('/clients',clientRoute)
routes.use('/realtor', realtorRoute)
export default routes