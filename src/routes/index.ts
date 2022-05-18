import { Router } from "express";
<<<<<<< HEAD
import realtor from "./realtors";

const routes = Router()
routes.use(realtor)


=======
import clientRoute from "./clients";
const routes = Router()
routes.use('/clients',clientRoute)
>>>>>>> develop

export default routes