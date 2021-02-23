import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeUpdateController, makeUpdateStatusController } from '../factories/update'
import { auth } from '../middlewares/auth'
import { TypeEnum } from '../../domain/models/enum/type-enum'

export default (router: Router): void => {
  router.patch('/user/:id', auth([TypeEnum.ROOT, TypeEnum.ADMIN]), adaptRoute(makeUpdateController()))
  router.patch('/user/:id/status', auth([TypeEnum.ROOT, TypeEnum.ADMIN]), adaptRoute(makeUpdateStatusController()))
}
