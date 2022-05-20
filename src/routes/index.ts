import { Router } from 'express'

import propertiesRouter from './properties'
import clientRoute from './clients'
import realtorRoute from './realtors'
import imageRouter from './images'

const routes = Router()

routes.use('/clients', clientRoute)
routes.use('/realtor', realtorRoute)
routes.use('/properties', propertiesRouter)
routes.use('/image', imageRouter)

export default routes
