import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { serverError, ok, notFound } from '../../helpers/http-helper'
import { GetUser } from '../../../domain/usecases/get-user'

export class ListController implements Controller {
  constructor (private readonly getUser: GetUser) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params
      const user = await this.getUser.getById(id)
      if (!user) {
        return notFound('user')
      }
      return ok(user)
    } catch (error) {
      return serverError(error)
    }
  }
}
