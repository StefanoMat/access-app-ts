import { Router } from 'express'
import { makeRegisterController } from '../factories/register'
import { adaptRoute } from '../adapters/express-route-adapter'
import { TypeEnum } from '../../domain/models/enum/type-enum'
import { auth } from '../middlewares/auth'

export default (router: Router): void => {
  router.post('/user/register', auth([TypeEnum.ROOT, TypeEnum.ADMIN]), adaptRoute(makeRegisterController()))
}
