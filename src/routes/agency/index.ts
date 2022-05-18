import express from "express";
import { expressYupMiddleware } from "express-yup-middleware";
import AgencyController from "../../controllers/agency.controller";
import verifyAgencyEmailMiddleware from "../../middlewares/agency/verifyEmail.middleware";
import agencyCreateValidator from "../../validations/agency";

const agencyRoute = express.Router();

agencyRoute
  .route("/")
  .get(AgencyController.index)
  .post(
    expressYupMiddleware({ schemaValidator: agencyCreateValidator }),
    verifyAgencyEmailMiddleware,
    AgencyController.store
  );

agencyRoute.route("/login").post(AgencyController.login);

agencyRoute
  .route("/:id")
  .patch(AgencyController.update)
  /* .get(AgencyController.show); */

export default agencyRoute;