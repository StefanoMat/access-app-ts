import { UserModel } from '../models/user'

export interface AddUserModel {
  name: string
  email: string
  password: string
  typeId: number
  status: boolean
}

export interface AddUser {
  add: (data: AddUserModel) => Promise<UserModel>
}
