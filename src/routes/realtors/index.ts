import express from "express";
import { expressYupMiddleware } from "express-yup-middleware";
import RealtorsController from "../../controllers/realtors.controller";
import {
  realtorCreateValidator,
  realtorLoginValidator,
} from "../../validations/realtors";

const realtorRoute = express.Router();

realtorRoute
  .route("/")
  .get(RealtorsController.index)
  .post(
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
  .delete(RealtorsController.delete)
  .patch(RealtorsController.update)
  .get(RealtorsController.show);

export default realtorRoute;
