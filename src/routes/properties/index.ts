import { Router } from "express";
import PropertiesController from "../../controllers/properties.controller";

const propertiesRouter = Router();

propertiesRouter
  .route("/")
  .post(PropertiesController.store)
  .get(PropertiesController.index);

propertiesRouter
  .route("/:id_property")
  .get(PropertiesController.show)
  .patch(PropertiesController.update)
  .delete(PropertiesController.delete);

export default propertiesRouter;
