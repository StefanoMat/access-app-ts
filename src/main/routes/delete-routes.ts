import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeDeleteUserController } from '../factories/delete'

export default (router: Router): void => {
  router.delete('/user/:id', adaptRoute(makeDeleteUserController()))
}
