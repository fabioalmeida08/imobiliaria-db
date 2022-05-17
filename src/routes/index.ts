import { Router } from "express";
import clientRoute from "./clients";
const routes = Router()
routes.use('/clients',clientRoute)

export default routes