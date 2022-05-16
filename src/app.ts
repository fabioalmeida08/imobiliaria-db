import express from 'express'
import errorHandlerMiddleware from './middlewares/error/errorHandler.middleware'
import routes from './routes'
import "reflect-metadata"
import "express-async-errors"
const app = express()

app.use(express.json())
app.use(errorHandlerMiddleware)
app.use(routes)


export default app