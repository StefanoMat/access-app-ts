import { UpdateStatusController } from './update-status'
import { UpdateStatusUser } from '../../../domain/usecases/update-status-user'
import { GetUser } from '../../../domain/usecases/get-user'
import { UserModel } from '../../../domain/models/user'
import { serverError, badRequest, ok, notFound } from '../../helpers/http-helper'
import { ServerError } from '../../errors'
import { HttpRequest } from '../../protocols'
import { InvalidParamError } from '../../errors/invalid-param-error'
import { NotFoundError } from '../../errors/not-found-error'

const makeGetUser = (): GetUser => {
  class GetUserStub implements GetUser {
    async getById (param: number): Promise<UserModel> {
      return await new Promise(resolve => resolve(makeFakeUser()))
    }
  }

  return new GetUserStub()
}

const makeUpdateStatusUser = (): UpdateStatusUser => {
  class UpdateStatusUserStub implements UpdateStatusUser {
    async updateStatusById (id: number, status: boolean): Promise<UserModel> {
      return await new Promise(resolve => resolve(makeFakeUser()))
    }
  }

  return new UpdateStatusUserStub()
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
  },
  body: {
    status: false
  }
})

interface SutTypes {
  sut: UpdateStatusController
  updateStatusUserStub: UpdateStatusUser
  getUserStub: GetUser
}
const makeSut = (): SutTypes => {
  const getUserStub = makeGetUser()
  const updateStatusUserStub = makeUpdateStatusUser()
  const sut = new UpdateStatusController(updateStatusUserStub, getUserStub)
  return { sut, updateStatusUserStub, getUserStub }
}

describe('Update Controller', () => {
  test('Should return 400 if invalid status is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: {
        id: 'any_id'
      },
      body: {
        status: 'not_bool'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('status')))
  })

  test('Should return 500 if GetUser throws', async () => {
    const { sut, getUserStub } = makeSut()
    jest.spyOn(getUserStub, 'getById').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 500 if UpdateStatusUser throws', async () => {
    const { sut, updateStatusUserStub } = makeSut()
    jest.spyOn(updateStatusUserStub, 'updateStatusById').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 404 if User not found', async () => {
    const { sut, getUserStub } = makeSut()
    jest.spyOn(getUserStub, 'getById').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => resolve(null))
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse.statusCode).toBe(404)
    expect(httpResponse).toEqual(notFound(new NotFoundError('User')))
  })

  test('Should return 200 if valid fields are provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeUser()))
  })
})
