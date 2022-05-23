import { Router } from 'express'
import PropertiesController from '../../controllers/properties.controller'
import authCreatePropertyMiddleware from '../../middlewares/properties/authCreateProperty.middleware'
import authDeletePropertyMiddleware from '../../middlewares/properties/authDeleteProperty.middleware'
import authListPropertyMiddleware from '../../middlewares/properties/authListProperty.middleware'
import authUpdatePropertyMiddleware from '../../middlewares/properties/authUpdateProperty.middleware'
import multer from 'multer'
import { uploadImage } from '../../services/firebase/firebase'
import { expressYupMiddleware } from 'express-yup-middleware'
import propertyValidator from '../../validations/properties'

const propertiesRouter = Router()

const Multer = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024,
  },
})

propertiesRouter
  .route('/')
  .post(
    expressYupMiddleware({ schemaValidator: propertyValidator }),
    authCreatePropertyMiddleware,
    Multer.single('image'),
    uploadImage,
    PropertiesController.store
  )
  .get(authListPropertyMiddleware, PropertiesController.index)

propertiesRouter
  .route('/:id_property')
  .get(authListPropertyMiddleware, PropertiesController.show)
  .patch(authUpdatePropertyMiddleware, PropertiesController.update)
  .delete(authDeletePropertyMiddleware, PropertiesController.delete)

export default propertiesRouter
