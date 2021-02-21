import { UserModel } from '../../domain/models/user'

export interface GetUserRepository {
  getById: (param: number) => Promise<UserModel>
}
