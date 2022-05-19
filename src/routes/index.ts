import { Router } from "express"
import clientRoute from "./clients"
import realtorRoute from "./realtors"
import salesRoute from "./sales"

const routes = Router()

routes.use("/clients", clientRoute)
routes.use("/realtor", realtorRoute)
routes.use("/property", salesRoute)

export default routes
