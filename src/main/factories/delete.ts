import { Controller } from '../../presentation/protocols'
import { UserRepository } from '../../infra/db/postgres/user-repository/user'
import { DataGetUser } from '../../data/usecases/get-user/data-get-user'
import { DataDeleteUser } from '../../data/usecases/delete-user/data-delete-user'
import { DeleteController } from '../../presentation/controllers/delete/delete'
import { LogControllerDecorator } from '../decorators/log'

export const makeDeleteUserController = (): Controller => {
  const userRepository = new UserRepository()
  const dataGetUser = new DataGetUser(userRepository)
  const dataDeleteUser = new DataDeleteUser(userRepository)
  const deleteUserController = new DeleteController(dataDeleteUser, dataGetUser)
  return new LogControllerDecorator(deleteUserController)
}
