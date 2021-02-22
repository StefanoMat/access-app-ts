import { UserModel } from '../../../domain/models/user'
import { UpdateUser, UpdateUserModel } from '../../../domain/usecases/update-user'
import { UpdateUserRepository } from '../../protocols/update-user-repository'

export class DataUpdateUser implements UpdateUser {
  private readonly updateUserRepository: UpdateUserRepository

  constructor (updateUserRepository: UpdateUserRepository) {
    this.updateUserRepository = updateUserRepository
  }

  async updateById (id: number, data: UpdateUserModel): Promise<UserModel> {
    return await this.updateUserRepository.updateById(id, data)
  }
}
