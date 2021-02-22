import { UserModel } from '../../domain/models/user'

export interface UpdateStatusUserRepository {
  updateStatusById: (id: number, status: boolean) => Promise<UserModel>
}
