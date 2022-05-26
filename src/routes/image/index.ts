import { Router } from 'express'
import { uploadImage } from '../../services/firebase/firebase'
import multer from 'multer'
import ImageController from '../../controllers/image.controller'
import AcessAuthMiddleware from '../../middlewares/realtorAuth/verifyShowRealtor'
import authImageMiddleware from '../../middlewares/image/authImage.middleware'

const imageRoutes = Router()

const Multer = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024,
  },
})

imageRoutes
  .route('/')
  .post(
    authImageMiddleware,
    Multer.array('image', 4),
    uploadImage,
    ImageController.store
  )

imageRoutes
  .route('/:image_id')
  .delete(authImageMiddleware, ImageController.delete)

imageRoutes
  .route('/:property_id')
  .get(AcessAuthMiddleware, ImageController.index)
export default imageRoutes
