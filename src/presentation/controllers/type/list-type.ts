import { Controller, HttpResponse, HttpRequest } from '../../protocols'
import { serverError, ok } from '../../helpers/http-helper'
import { ListType } from '../../../domain/usecases/list-type'

export class ListTypeController implements Controller {
  constructor (private readonly listType: ListType) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const types = await this.listType.getAll()
      return ok(types)
    } catch (error) {
      return serverError(error)
    }
  }
}
