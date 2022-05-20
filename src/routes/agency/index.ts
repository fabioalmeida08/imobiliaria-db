import express from "express";
import { expressYupMiddleware } from "express-yup-middleware";
import AgencyController from "../../controllers/agency.controller";
import verifyAgencyEmailMiddleware from "../../middlewares/agency/verifyEmail.middleware";
import {agencyCreateValidator, agencyLoginValidator} from "../../validations/agency";
import verifyAgencyTokenMiddleware from "../../middlewares/agency/verifyToken.middleware";

const agencyRoute = express.Router();

agencyRoute
  .route("")
  .get(verifyAgencyTokenMiddleware, AgencyController.index)
  .post(
    expressYupMiddleware({ schemaValidator: agencyCreateValidator }),
    AgencyController.store
  );

agencyRoute.route("/login").post(expressYupMiddleware({ schemaValidator: agencyLoginValidator }),AgencyController.login);

agencyRoute
  .route("/:id")
  .patch(verifyAgencyTokenMiddleware, AgencyController.update)
  /* .get(AgencyController.show); */

export default agencyRoute;