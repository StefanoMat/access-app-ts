import { AuthMiddleware } from '../../presentation/middlewares/auth-middleware'
import { Middleware } from '../../presentation/protocols/middleware'
import { makeDataGetUserAccountByToken } from './get-user-account-by-token'
import { TypeEnum } from '../../domain/models/enum/type-enum'

export const makeAuthMiddleware = (role?: TypeEnum[]): Middleware => {
  return new AuthMiddleware(makeDataGetUserAccountByToken(), role)
}
