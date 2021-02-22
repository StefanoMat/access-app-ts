import { UserModel } from '../models/user'

export interface UpdateUserModel {
  name?: string | null
  typeId?: number | null
}

export interface UpdateUser {
  updateById: (id: number, data: UpdateUserModel) => Promise<UserModel>
}
