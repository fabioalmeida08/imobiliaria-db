import express from "express";
import RealtorsController from "../../controllers/realtors/realtors.controller";
import { expressYupMiddleware } from "express-yup-middleware";
import realtorCreateValidator from "../../validations/realtors";

const realtorRoute = express.Router();

realtorRoute
  .route("/")
  .get(
    expressYupMiddleware({ schemaValidator: realtorCreateValidator }),
    RealtorsController.index
  )
  .post(
    expressYupMiddleware({ schemaValidator: realtorCreateValidator }),
    RealtorsController.store
  );

realtorRoute.route("/login").post(RealtorsController.login);

realtorRoute
  .route("/:id")
  .delete(RealtorsController.delete)
  .patch(RealtorsController.update)
  .get(RealtorsController.show);

export default realtorRoute;
