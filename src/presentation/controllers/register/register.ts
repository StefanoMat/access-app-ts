import { HttpRequest, Controller, HttpResponse } from '../../protocols'
import { serverError, ok, badRequest } from '../../helpers/http-helper'
import { MissingParamError } from '../../errors'
import { AddUser } from '../../../domain/usecases/add-user'

export class RegisterController implements Controller {
  private readonly addUser: AddUser

  constructor (addUser: AddUser) {
    this.addUser = addUser
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password', 'typeId', 'status']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { name, email, password, typeId, status } = httpRequest.body
      const user = await this.addUser.add({
        name,
        email,
        password,
        typeId,
        status
      })
      return ok(user)
    } catch (error) {
      return serverError(error)
    }
  }
}
