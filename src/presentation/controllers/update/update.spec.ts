import { UpdateController } from './update'
import { GetUser } from '../../../domain/usecases/get-user'
import { UpdateUser, UpdateUserModel } from '../../../domain/usecases/update-user'
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

const makeUpdateUser = (): UpdateUser => {
  class UpdateUserStub implements UpdateUser {
    async updateById (id: number, data: UpdateUserModel): Promise<UserModel> {
      return await new Promise(resolve => resolve(makeFakeUser()))
    }
  }

  return new UpdateUserStub()
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
    name: 'any_name',
    typeId: 'valid_id'
  }
})

interface SutTypes {
  sut: UpdateController
  updateUserStub: UpdateUser
  getUserStub: GetUser
}
const makeSut = (): SutTypes => {
  const getUserStub = makeGetUser()
  const updateUserStub = makeUpdateUser()
  const sut = new UpdateController(updateUserStub, getUserStub)
  return { sut, updateUserStub, getUserStub }
}

describe('Update Controller', () => {
  test('Should return 500 if GetUser throws', async () => {
    const { sut, getUserStub } = makeSut()
    jest.spyOn(getUserStub, 'getById').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 500 if UpdateUser throws', async () => {
    const { sut, updateUserStub } = makeSut()
    jest.spyOn(updateUserStub, 'updateById').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should call GetUser with correct value', async () => {
    const { sut, getUserStub } = makeSut()
    const getByIdSpy = jest.spyOn(getUserStub, 'getById')
    await sut.handle(makeFakeRequest())
    expect(getByIdSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should call UpdateUser with correct value', async () => {
    const { sut, updateUserStub } = makeSut()
    const updateByIdSpy = jest.spyOn(updateUserStub, 'updateById')
    await sut.handle(makeFakeRequest())
    expect(updateByIdSpy).toHaveBeenCalledWith('any_id', { name: 'any_name', typeId: 'valid_id' })
  })

  test('Should return 200 if valid fields are provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeUser()))
  })
})
