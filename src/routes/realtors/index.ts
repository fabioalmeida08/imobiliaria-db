import express from "express";
import { expressYupMiddleware } from "express-yup-middleware";
import RealtorsController from "../../controllers/realtors.controller";
import verifyAgencyTokenMiddleware from "../../middlewares/agency/verifyToken.middleware";
import updateRealtorMiddleware from "../../middlewares/realtorAuth/updateRealtor.middleware";
import AcessAuthMiddleware from "../../middlewares/realtorAuth/verifyShowRealtor";
import {
  realtorCreateValidator,
  realtorLoginValidator,
} from "../../validations/realtors";

const realtorRoute = express.Router();

realtorRoute
  .route("/")
  .get(verifyAgencyTokenMiddleware, RealtorsController.index)
  .post(
    verifyAgencyTokenMiddleware,
    expressYupMiddleware({ schemaValidator: realtorCreateValidator }),
    RealtorsController.store
  );

realtorRoute
  .route("/login")
  .post(
    expressYupMiddleware({ schemaValidator: realtorLoginValidator }),
    RealtorsController.login
  );

realtorRoute
  .route("/:id")
  .delete(verifyAgencyTokenMiddleware, RealtorsController.delete)
  .patch(updateRealtorMiddleware, RealtorsController.update)
  .get(AcessAuthMiddleware, RealtorsController.show);

export default realtorRoute;
