import { Middleware } from '../protocols/middleware'
import { serverError } from '../helpers/http-helper'
import { HttpResponse } from '../protocols'

export class AuthMiddleware implements Middleware {
    constructor (
        private readonly getUserAccountByToken: GetUserAccountByToken
    ){}

  async handle (request: AuthMiddleware.Request): Promise<HttpResponse> {
    try {
        const { accessToken } = request
        if (accessToken) {
          const account = await this.getUserAccountByToken.load(accessToken, this.role)
          if (account) {
            return ok({ accountId: account.id })
          }
        }
        return forbidden(new AccessDeniedError())
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
