import { Router } from 'express'
import { makeFindController } from '../factories/find'
import { adaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  router.get('/user/:id', adaptRoute(makeFindController()))
}
