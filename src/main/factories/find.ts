import { UserRepository } from '../../infra/db/postgres/user-repository/user'
import { FindController } from '../../presentation/controllers/find/find'
import { DataGetUser } from '../../data/usecases/get-user/data-get-user'
import { LogControllerDecorator } from '../decorators/log'
import { Controller } from '../../presentation/protocols'

export const makeFindController = (): Controller => {
  const userRepository = new UserRepository()
  const dataGetUser = new DataGetUser(userRepository)
  const findController = new FindController(dataGetUser)
  return new LogControllerDecorator(findController)
}
