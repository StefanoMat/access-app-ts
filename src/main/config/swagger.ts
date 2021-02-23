import swaggerSetup from '../docs'

import { serve, setup } from 'swagger-ui-express'
import { Express } from 'express'

export default (app: Express): void => {
  app.use('/docs', serve, setup(swaggerSetup))
}
