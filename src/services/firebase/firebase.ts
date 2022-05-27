import { Request, Response, NextFunction } from 'express'

interface multerFile {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  buffer: Buffer
  size: number
}

var admin = require('firebase-admin')

const BUCKET = 'capstone-m4-9d18d.appspot.com'

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL
  }),
  storageBucket: BUCKET
})

const bucket = admin.storage().bucket()

export const uploadImage = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let image: Express.Multer.File[] | any = request.files

  if (!image) {
    return next()
  }

  const urlImages = image?.map((element: multerFile) => {
    const fileName = Date.now() + '.' + element.originalname.split('.').pop()
    let stringFire = ''
    const file = bucket.file(fileName)

    const stream = file.createWriteStream({
      metaData: {
        contentType: element.mimetype
      }
    })

    stream.on('error', (error: any) => {
      console.log(error)
    })

    stringFire = `https://storage.googleapis.com/${BUCKET}/${fileName}`

    stream.on('finish', async () => {
      await file.makePublic()
    })
    stream.end(element.buffer)
    return stringFire
  })

  request.firebaseUrl = urlImages
  next()
}
