import { FindController } from './find'
import { GetUser } from '../../../domain/usecases/get-user'
import { UserModel } from '../../../domain/models/user'
import { HttpRequest } from '../../protocols'
import { serverError, ok, notFound } from '../../helpers/http-helper'
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

const makeFakeRequest = (): HttpRequest => ({
  params: {
    id: 'any_id'
  }
})

const makeFakeUser = (): UserModel => ({
  id: 1,
  name: 'any_valid_name',
  email: 'any_valid_email@mail.com',
  password: 'any_valid_pass',
  typeId: 1,
  status: true
})

interface SutTypes {
  sut: FindController
  getUserStub: GetUser
}
const makeSut = (): SutTypes => {
  const getUserStub = makeGetUser()
  const sut = new FindController(getUserStub)
  return { sut, getUserStub }
}

describe('Find Controller', () => {
  test('Should call GetUser with correct value', async () => {
    const { sut, getUserStub } = makeSut()
    const getByIdSpy = jest.spyOn(getUserStub, 'getById')
    await sut.handle(makeFakeRequest())
    expect(getByIdSpy).toHaveBeenCalledWith('any_id')
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

  test('Should return 404 if User not found', async () => {
    const { sut, getUserStub } = makeSut()
    jest.spyOn(getUserStub, 'getById').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => resolve(null))
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse.statusCode).toBe(404)
    expect(httpResponse).toEqual(notFound(new NotFoundError('User')))
  })

  test('Should return 200 if valid param is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeUser()))
  })
})
