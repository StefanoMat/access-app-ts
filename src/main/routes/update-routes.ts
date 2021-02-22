import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeUpdateController, makeUpdateStatusController } from '../factories/update'

export default (router: Router): void => {
  router.patch('/user/:id', adaptRoute(makeUpdateController()))
  router.patch('/user/:id/status', adaptRoute(makeUpdateStatusController()))
}
