import { UserModel } from '../../domain/models/user'
import { UpdateUserModel } from '../../domain/usecases/update-user'

export interface UpdateUserRepository {
  updateById: (id: number, data: UpdateUserModel) => Promise<UserModel>
}
