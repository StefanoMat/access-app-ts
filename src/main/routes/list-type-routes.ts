import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeListTypeController } from '../factories/list-type'

export default (router: Router): void => {
  router.get('/type', adaptRoute(makeListTypeController()))
}
