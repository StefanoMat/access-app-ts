import { Router } from 'express'
import { makeRegisterController } from '../factories/register'
import { adaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  router.post('/register', adaptRoute(makeRegisterController()))
}
