import { HttpRequest, HttpResponse, Controller } from '../../protocols'
import { serverError, notFound, ok } from '../../helpers/http-helper'
import { GetUser } from '../../../domain/usecases/get-user'
import { NotFoundError } from '../../errors/not-found-error'
import { UpdateUser } from '../../../domain/usecases/update-user'

export class Update implements Controller {
  constructor (
    private readonly updateUser: UpdateUser,
    private readonly getUser: GetUser
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params
      const { name, typeId } = httpRequest.body
      const user = await this.getUser.getById(id)
      if (!user) {
        return notFound(new NotFoundError('User'))
      }
      const result = await this.updateUser.updateById(id, { name: name, typeId: typeId })
      return ok(result)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}
