import { Router } from 'express'
import { makeListController } from '../factories/list'
import { adaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  router.get('/user/:id', adaptRoute(makeListController()))
}
