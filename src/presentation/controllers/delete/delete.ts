import { GetUser } from '../../../domain/usecases/get-user'
import { serverError, notFound, ok, noContent } from '../../helpers/http-helper'
import { HttpResponse, HttpRequest, Controller } from '../../protocols'
import { NotFoundError } from '../../errors/not-found-error'
import { DeleteUser } from '../../../domain/usecases/delete-user'

export class DeleteController implements Controller {
  constructor (
    private readonly deleteUser: DeleteUser,
    private readonly getUser: GetUser
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params
      const user = await this.getUser.getById(id)
      if (!user) {
        return notFound(new NotFoundError('User'))
      }
      await this.deleteUser.deleteById(id)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
