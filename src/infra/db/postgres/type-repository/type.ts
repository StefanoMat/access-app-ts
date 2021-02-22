import { ListTypeRepository } from '../../../../data/protocols/list-type-repository'
import { TypeModel } from '../../../../domain/models/type'
import { getConnection } from 'typeorm'

export class TypeRepository implements ListTypeRepository {
  async getAll (): Promise<TypeModel[]> {
    return await getConnection().createQueryBuilder()
      .select('*')
      .from('public.type', 'type')
      .getRawMany()
  }
}
