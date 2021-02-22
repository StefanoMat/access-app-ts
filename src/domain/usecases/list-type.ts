import { TypeModel } from '../models/type'

export interface ListType {
  getAll: () => Promise<TypeModel[]>
}
