import { Router } from 'express'
import multer from 'multer'
import ImagesController from '../../controllers/images.controller'
import { uploadImage } from '../../services/firebase/firebase'

const imageRouter = Router()

const Multer = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024,
  },
})

imageRouter
  .route('/')
  .post(Multer.single('image'), uploadImage, ImagesController.store)

export default imageRouter
