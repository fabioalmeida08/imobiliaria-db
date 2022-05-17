import { Router } from "express";
import realtor from "./realtors";

const routes = Router()
routes.use(realtor)



export default routes