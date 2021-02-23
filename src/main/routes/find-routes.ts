import { Router } from 'express'
import { makeFindController } from '../factories/find'
import { adaptRoute } from '../adapters/express-route-adapter'
import { TypeEnum } from '../../domain/models/enum/type-enum'
import { auth } from '../middlewares/auth'

export default (router: Router): void => {
  router.get('/user/:id', auth([TypeEnum.ROOT]), adaptRoute(makeFindController()))
}
