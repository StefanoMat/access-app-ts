import { GetUser } from '../../../domain/usecases/get-user'
import { UserModel } from '../../../domain/models/user'
import { DeleteController } from './delete'
import { DeleteUser } from '../../../domain/usecases/delete-user'
import { HttpRequest } from '../../protocols'
import { serverError, badRequest, notFound, noContent } from '../../helpers/http-helper'
import { ServerError } from '../../errors'
import { NotFoundError } from '../../errors/not-found-error'

const makeGetUser = (): GetUser => {
  class GetUserStub implements GetUser {
    async getById (param: number): Promise<UserModel> {
      return await new Promise(resolve => resolve(makeFakeUser()))
    }
  }

  return new GetUserStub()
}

const makeDeleteUser = (): DeleteUser => {
  class DeleteUserStub implements DeleteUser {
    async deleteById (id: number): Promise<boolean> {
      return await new Promise(resolve => resolve(true))
    }
  }

  return new DeleteUserStub()
}

const makeFakeUser = (): UserModel => ({
  id: 1,
  name: 'any_valid_name',
  email: 'any_valid_email@mail.com',
  password: 'any_valid_pass',
  typeId: 1,
  status: true
})

const makeFakeRequest = (): HttpRequest => ({
  params: {
    id: 'any_id'
  }
})

interface SutTypes {
  sut: DeleteController
  deleteUserStub: DeleteUser
  getUserStub: GetUser
}

const makeSut = (): SutTypes => {
  const getUserStub = makeGetUser()
  const deleteUserStub = makeDeleteUser()
  const sut = new DeleteController(deleteUserStub, getUserStub)
  return { sut, deleteUserStub, getUserStub }
}

describe('Delete Controller', () => {
  test('Should return 500 if GetUser throws', async () => {
    const { sut, getUserStub } = makeSut()
    jest.spyOn(getUserStub, 'getById').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 500 if DeleteUser throws', async () => {
    const { sut, deleteUserStub } = makeSut()
    jest.spyOn(deleteUserStub, 'deleteById').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 404 if user is null', async () => {
    const { sut, getUserStub } = makeSut()
    jest.spyOn(getUserStub, 'getById').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => resolve(null))
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse.statusCode).toBe(404)
    expect(httpResponse).toEqual(notFound(new NotFoundError('User')))
  })

  test('Should return 204 if does not throws', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse.statusCode).toBe(204)
    expect(httpResponse).toEqual(noContent())
  })
})
