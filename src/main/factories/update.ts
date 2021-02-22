import { DataUpdateUser } from '../../data/usecases/update-user.ts/data-update-user'
import { UserRepository } from '../../infra/db/postgres/user-repository/user'
import { Update } from '../../presentation/controllers/update/update'
import { DataGetUser } from '../../data/usecases/get-user/data-get-user'
import { LogControllerDecorator } from '../decorators/log'
import { Controller } from '../../presentation/protocols'

export const makeUpdateController = (): Controller => {
  const userRepository = new UserRepository()
  const dataGetUser = new DataGetUser(userRepository)
  const dataUpdateUser = new DataUpdateUser(userRepository)
  const updateController = new Update(dataUpdateUser, dataGetUser)
  return new LogControllerDecorator(updateController)
}
