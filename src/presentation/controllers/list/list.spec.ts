import { ListController } from './list'
import { GetUser } from '../../../domain/usecases/get-user'
import { UserModel } from '../../../domain/models/user'
import { HttpRequest } from '../../protocols'
import { serverError, ok } from '../../helpers/http-helper'
import { ServerError } from '../../errors'

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
  sut: ListController
  getUserStub: GetUser
}
const makeSut = (): SutTypes => {
  const getUserStub = makeGetUser()
  const sut = new ListController(getUserStub)
  return { sut, getUserStub }
}

describe('List Controller', () => {
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

  test('Should return 200 if valid param is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeUser()))
  })
})
