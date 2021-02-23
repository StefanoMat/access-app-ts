import { Middleware } from '../protocols/middleware'
import { serverError, ok, forbidden } from '../helpers/http-helper'
import { HttpResponse } from '../protocols'
import { GetUserAccountByToken } from '../../domain/usecases/get-user-account-by-token'
import { AccessForbiddenError } from '../errors/access-forbidden-error'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly getUserAccountByToken: GetUserAccountByToken,
    private readonly role?: string
  ) {}

  async handle (request: AuthMiddleware.Request): Promise<HttpResponse> {
    try {
      const { accessToken } = request
      if (accessToken) {
        const userAccount = await this.getUserAccountByToken.getByToken(accessToken, this.role)
        if (userAccount) {
          return ok({ userId: userAccount.id })
        }
      }
      return forbidden(new AccessForbiddenError())
    } catch (error) {
      return serverError(error)
    }
  }
}
export namespace AuthMiddleware {
  export interface Request {
    accessToken?: string
  }
}
