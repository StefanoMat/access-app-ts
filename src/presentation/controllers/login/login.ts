import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { serverError, badRequest, notFound, unauthorized, ok } from '../../helpers/http-helper'
import { MissingParamError } from '../../errors'
import { GetUserAccount } from '../../../domain/usecases/get-user-account'
import { Authentication } from '../../../domain/usecases/authtentication'
import { NotFoundError } from '../../errors/not-found-error'

export class LoginController implements Controller {
  constructor (
    private readonly getUserAccount: GetUserAccount,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { email, password } = httpRequest.body
      const user = await this.getUserAccount.getByEmail(email)
      if (!user) {
        return notFound(new NotFoundError('User'))
      }
      const authentication = await this.authentication.auth({ email, password })
      if (!authentication) {
        return unauthorized()
      }
      return ok(authentication)
    } catch (error) {
      return serverError(error)
    }
  }
}
