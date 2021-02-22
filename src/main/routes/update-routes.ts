import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeUpdateController } from '../factories/update'

export default (router: Router): void => {
  router.patch('/user/:id', adaptRoute(makeUpdateController()))
}
