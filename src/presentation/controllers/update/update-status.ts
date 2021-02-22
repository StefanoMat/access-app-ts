import { serverError, badRequest, notFound, ok } from '../../helpers/http-helper'
import { HttpRequest, HttpResponse, Controller } from '../../protocols'
import { GetUser } from '../../../domain/usecases/get-user'
import { InvalidParamError } from '../../errors/invalid-param-error'
import { UpdateStatusUser } from '../../../domain/usecases/update-status-user'
import { NotFoundError } from '../../errors/not-found-error'

export class UpdateStatusController implements Controller {
  constructor (
    private readonly updateStatusUser: UpdateStatusUser,
    private readonly getUser: GetUser
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params
      const { status } = httpRequest.body
      if (typeof status !== 'boolean') {
        return badRequest(new InvalidParamError('status'))
      }
      const user = await this.getUser.getById(id)
      if (!user) {
        return notFound(new NotFoundError('User'))
      }
      const result = await this.updateStatusUser.updateStatusById(id, status)
      return ok(result)
    } catch (error) {
      return serverError(error)
    }
  }
}
