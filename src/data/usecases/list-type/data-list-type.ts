import { ListType } from '../../../domain/usecases/list-type'
import { TypeModel } from '../../../domain/models/type'
import { ListTypeRepository } from '../../protocols/list-type-repository'

export class DataListType implements ListType {
  private readonly listTypeRepository: ListTypeRepository

  constructor (listTypeRepository: ListTypeRepository) {
    this.listTypeRepository = listTypeRepository
  }

  async getAll (): Promise<TypeModel[]> {
    return await this.listTypeRepository.getAll()
  }
}
