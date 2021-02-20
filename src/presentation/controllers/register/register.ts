import { HttpRequest, Controller, HttpResponse } from '../protocols'
import { serverError, ok, badRequest } from '../helpers/http-helper'
import { MissingParamError } from '../errors'

export class RegisterController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
