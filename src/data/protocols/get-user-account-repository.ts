import { UserModel } from '../../domain/models/user'

export interface GetUserAccountRepository {
  getByEmail: (email: string) => Promise<UserModel>
}
