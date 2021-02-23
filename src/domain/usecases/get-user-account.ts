import { UserModel } from '../models/user'

export interface GetUserAccount {
  getByEmail: (email: string) => Promise<UserModel>
}
