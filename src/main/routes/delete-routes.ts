import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeDeleteUserController } from '../factories/delete'
import { TypeEnum } from '../../domain/models/enum/type-enum'
import { auth } from '../middlewares/auth'

export default (router: Router): void => {
  router.delete('/user/:id', auth([TypeEnum.ROOT]), adaptRoute(makeDeleteUserController()))
}
