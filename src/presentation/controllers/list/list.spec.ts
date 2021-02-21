import { ListController } from './list'
import { GetUser, GetUserParams } from '../../../domain/usecases/get-user'
import { UserModel } from '../../../domain/models/user'
import { HttpRequest } from '../../protocols'

const makeGetUser = (): GetUser => {
  class GetUserStub implements GetUser {
    async getById (param: GetUserParams): Promise<UserModel> {
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
})
