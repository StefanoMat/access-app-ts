import { Controller } from '../../presentation/protocols'
import { LoginController } from '../../presentation/controllers/login/login'
import { LogControllerDecorator } from '../decorators/log'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { JwtAdapter } from '../../infra/criptography/jwt.adapter'
import { UserAccountRepository } from '../../infra/db/postgres/user-repository/user-account'
import { DataAuthentication } from '../../data/usecases/authentication/data-authentication'

export const makeLoginController = (): Controller => {
  const salt = 10
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(process.env.JWT_SECRET)
  const userAccountRepository = new UserAccountRepository()
  const dataAuthentication = new DataAuthentication(userAccountRepository, bcryptAdapter, jwtAdapter)
  const loginController = new LoginController(userAccountRepository, dataAuthentication)
  return new LogControllerDecorator(loginController)
}
