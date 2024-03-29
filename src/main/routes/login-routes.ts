import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeLoginController } from '../factories/login'

export default (router: Router): void => {
  router.post('/user/login', adaptRoute(makeLoginController()))
}
