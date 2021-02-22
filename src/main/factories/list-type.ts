import { LogControllerDecorator } from '../decorators/log'
import { Controller } from '../../presentation/protocols'
import { TypeRepository } from '../../infra/db/postgres/type-repository/type'
import { DataListType } from '../../data/usecases/list-type/data-list-type'
import { ListTypeController } from '../../presentation/controllers/type/list-type'

export const makeListTypeController = (): Controller => {
  const typeRepository = new TypeRepository()
  const dataListType = new DataListType(typeRepository)
  const listTypeController = new ListTypeController(dataListType)
  return new LogControllerDecorator(listTypeController)
}
