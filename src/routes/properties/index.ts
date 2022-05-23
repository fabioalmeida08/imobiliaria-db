import { Router } from "express";
import { expressYupMiddleware } from "express-yup-middleware";
import propertyValidator from "../../validations/properties";

import PropertiesController from "../../controllers/properties.controller";

import authCreatePropertyMiddleware from "../../middlewares/properties/authCreateProperty.middleware";
import authDeletePropertyMiddleware from "../../middlewares/properties/authDeleteProperty.middleware";
import authListPropertyMiddleware from "../../middlewares/properties/authListProperty.middleware";
import authUpdatePropertyMiddleware from "../../middlewares/properties/authUpdateProperty.middleware";

const propertiesRouter = Router();

propertiesRouter
  .route("/")
  .post(
    expressYupMiddleware({ schemaValidator: propertyValidator }),
    authCreatePropertyMiddleware,
    PropertiesController.store
  )
  .get(authListPropertyMiddleware, PropertiesController.index);

propertiesRouter
  .route("/:id_property")
  .get(authListPropertyMiddleware, PropertiesController.show)
  .patch(authUpdatePropertyMiddleware, PropertiesController.update)
  .delete(authDeletePropertyMiddleware, PropertiesController.delete);

export default propertiesRouter;
