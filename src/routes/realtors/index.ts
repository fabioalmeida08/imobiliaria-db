import express from "express";
import RealtorsController from "../../controllers/realtors/realtors.controller";
import { expressYupMiddleware } from "express-yup-middleware";
import realtorCreateValidator from "../../validations/realtors";

const realtor = express.Router();

realtor
  .route("/")
  .get(
    expressYupMiddleware({ schemaValidator: realtorCreateValidator }),
    RealtorsController.index
  )
  .post(
    expressYupMiddleware({ schemaValidator: realtorCreateValidator }),
    RealtorsController.store
  );

realtor.route("/login").post(RealtorsController.login);

realtor
  .route("/:id")
  .delete(RealtorsController.delete)
  .patch(RealtorsController.update)
  .get(RealtorsController.show);

export default realtor;
