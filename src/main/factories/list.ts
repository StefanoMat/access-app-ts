import { UserRepository } from '../../infra/db/postgres/user-repository/user'
import { ListController } from '../../presentation/controllers/list/list'
import { DataGetUser } from '../../data/usecases/get-user/data-get-user'
import { LogControllerDecorator } from '../decorators/log'
import { Controller } from '../../presentation/protocols'

export const makeListController = (): Controller => {
  const userRepository = new UserRepository()
  const dataGetUser = new DataGetUser(userRepository)
  const listController = new ListController(dataGetUser)
  return new LogControllerDecorator(listController)
}
