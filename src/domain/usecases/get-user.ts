import { UserModel } from '../models/user'

export interface GetUser {
  getById: (params: number) => Promise<UserModel>
}
