import { Request, Response, NextFunction } from 'express'

var admin = require('firebase-admin')

var serviceAccount = require('../../config/firebase-key.json')

const BUCKET = 'capstone-m4-9d18d.appspot.com'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET,
})

const bucket = admin.storage().bucket()

export const uploadImage = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (!request.file) {
    return next()
  }
  const image = request.file

  const fileName = Date.now() + '.' + image.originalname.split('.').pop()

  const file = bucket.file(fileName)

  const stream = file.createWriteStream({
    metaData: {
      contentType: image.mimetype,
    },
  })

  stream.on('error', (error: any) => {
    console.log(error)
  })

  stream.on('finish', async () => {
    // tornar o arquivo publico
    await file.makePublic()
    //obter a url publica
    request.firebaseUrl = `https://storage.googleapis.com/${BUCKET}/${fileName}`

    next()
  })

  stream.end(image.buffer)
}
