import { RegisterController } from './register'
import { badRequest, serverError, ok } from '../../helpers/http-helper'
import { MissingParamError, ServerError } from '../../errors'
import { AddUser, AddUserModel, UserModel, HttpRequest } from '../../controllers/register/register-protocols'

const makeAddUser = (): AddUser => {
  class AddUserStub implements AddUser {
    async add (account: AddUserModel): Promise<UserModel> {
      return await new Promise(resolve => resolve(makeFakeUser()))
    }
  }

  return new AddUserStub()
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
  body: {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_pass',
    typeId: 'valid_type_id',
    status: 'valid_status'
  }
})
interface SutTypes {
  sut: RegisterController
  addUserStub: AddUser
}

const makeSut = (): SutTypes => {
  const addUserStub = makeAddUser()
  const sut = new RegisterController(addUserStub)
  return { sut, addUserStub }
}
describe('Register Controller', () => {
  test('Should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_pass',
        typeId: 1,
        status: true
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  })

  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_pass',
        typeId: 1,
        status: true
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        typeId: 1,
        status: true
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })

  test('Should return 400 if no typeId is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_pass',
        status: true
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('typeId')))
  })

  test('Should return 400 if no status is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_pass',
        typeId: 1
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('status')))
  })

  test('Should call AddUser with correct params', async () => {
    const { sut, addUserStub } = makeSut()
    const addSpy = jest.spyOn(addUserStub, 'add')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_pass',
      typeId: 'valid_type_id',
      status: 'valid_status'
    })
  })

  test('Should return 500 if AddUser throws', async () => {
    const { sut, addUserStub } = makeSut()
    jest.spyOn(addUserStub, 'add').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeUser()))
  })
})
