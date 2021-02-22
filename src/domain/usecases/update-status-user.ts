import { UserModel } from '../models/user'

export interface UpdateStatusUser {
  updateStatusById: (id: number, status: boolean) => Promise<UserModel>
}
