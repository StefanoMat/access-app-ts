import { UserModel } from '../models/user'

export interface GetUserParams {
  id: number
}
export interface GetUser {
  getById: (params: GetUserParams) => Promise<UserModel>
}
