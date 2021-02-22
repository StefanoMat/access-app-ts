import { GetUser } from '../../../domain/usecases/get-user'
import { GetUserRepository } from '../../protocols/get-user-repository'
import { UserModel } from '../../../domain/models/user'
import { DeleteUser } from '../../../domain/usecases/delete-user'
import { DeleteUserRepository } from '../../protocols/delete-user-repository'

export class DataDeleteUser implements DeleteUser {
  private readonly deleteUserRepository: DeleteUserRepository

  constructor (deleteUserRepository: DeleteUserRepository) {
    this.deleteUserRepository = deleteUserRepository
  }

  async deleteById (id: number): Promise<boolean> {
    return await this.deleteUserRepository.deleteById(id)
  }
}
