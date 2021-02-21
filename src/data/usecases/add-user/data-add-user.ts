import { AddUser, AddUserModel } from '../../../domain/usecases/add-user'
import { UserModel } from '../../../presentation/controllers/register/register-protocols'
import { AddUserRepository } from '../../protocols/add-user-repository'
import { Encrypter } from '../../protocols/encrypter'

export class DataAddUser implements AddUser {
  private readonly addUserRepository: AddUserRepository
  private readonly encrypter: Encrypter

  constructor (addUserRepository: AddUserRepository, encrypter: Encrypter) {
    this.addUserRepository = addUserRepository
    this.encrypter = encrypter
  }

  async add (userData: AddUserModel): Promise<UserModel> {
    const hashedPassword = await this.encrypter.encrypt(userData.password)
    const account = await this.addUserRepository.add(Object.assign({}, userData, { password: hashedPassword }))
    return account
  }
}
