import { Controller } from '../../presentation/protocols'
import { UserRepository } from '../../infra/db/postgres/user-repository/user'
import { DataAddUser } from '../../data/usecases/add-user/data-add-user'
import { RegisterController } from '../../presentation/controllers/register/register'
import { LogControllerDecorator } from '../decorators/log'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'

export const makeRegisterController = (): Controller => {
  const salt = 10
  const bcryptAdapter = new BcryptAdapter(salt)
  const userRepository = new UserRepository()
  const dataAddUser = new DataAddUser(userRepository, bcryptAdapter)
  const registerController = new RegisterController(dataAddUser)
  return new LogControllerDecorator(registerController)
}
