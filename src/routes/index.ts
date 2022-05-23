<<<<<<< HEAD
import { Router } from "express"

import propertiesRouter from "./properties"
import clientRoute from "./clients"
import realtorRoute from "./realtors"
import salesRoute from "./sales"
=======
import { Router } from "express";
import agencyRoute from "./agency";
import propertiesRouter from "./properties";
import clientRoute from "./clients";
import realtorRoute from "./realtors";
>>>>>>> 437136ab102d884ab08ced4e791451ad12bec856

const routes = Router()

<<<<<<< HEAD
routes.use("/clients", clientRoute)
routes.use("/realtor", realtorRoute)
routes.use("/properties", propertiesRouter)
routes.use("/property", salesRoute)
=======
routes.use("/agency", agencyRoute)
routes.use("/clients", clientRoute);
routes.use("/realtor", realtorRoute);
routes.use("/properties", propertiesRouter);
>>>>>>> 437136ab102d884ab08ced4e791451ad12bec856

export default routes
