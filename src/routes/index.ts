import { Router } from "express";
import agencyRoute from "./agency";

const routes = Router()

routes.use('/agency', agencyRoute)

export default routes