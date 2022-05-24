import { Router } from 'express'
import { uploadImage } from '../../services/firebase/firebase'
import multer from 'multer'
import ImageController from '../../controllers/image.controller'

const imageRoutes = Router()

const Multer = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024,
  },
})

imageRoutes
  .route('/')
  .post(Multer.array('image', 4), uploadImage, ImageController.store)

imageRoutes.route('/:image_id').delete(ImageController.delete)

imageRoutes.route('/:property_id').get(ImageController.index)
export default imageRoutes
