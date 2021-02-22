import { TypeModel } from '../../domain/models/type'

export interface ListTypeRepository {
  getAll: () => Promise<TypeModel[]>
}
