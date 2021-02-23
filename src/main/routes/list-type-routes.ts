import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeListTypeController } from '../factories/list-type'
import { auth } from '../middlewares/auth'
import { TypeEnum } from '../../domain/models/enum/type-enum'

export default (router: Router): void => {
  router.get('/type', auth([TypeEnum.GENERAL, TypeEnum.ADMIN, TypeEnum.ROOT]), adaptRoute(makeListTypeController()))
}
