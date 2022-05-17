import express from "express";
import RealtorsController from "../../controllers/realtors/realtors.controller";

const realtor = express.Router();

realtor.route("/").get(RealtorsController.index).post(RealtorsController.store);
realtor.route("/login").post(RealtorsController.login);
realtor
  .route("/:id")
  .delete(RealtorsController.delete)
  .patch(RealtorsController.update)
  .get(RealtorsController.show);

export default realtor;
