import { AddUserModel } from '../../domain/usecases/add-user'
import { UserModel } from '../../domain/models/user'

export interface AddUserRepository {
  add: (userData: AddUserModel) => Promise<UserModel>
}
