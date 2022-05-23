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
  .post(Multer.single('image'), uploadImage, ImageController.store)

imageRoutes
  .route('/:id')
  .delete(ImageController.delete)
  .get(ImageController.index)
export default imageRoutes
