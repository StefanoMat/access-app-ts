import { UserModel } from '../../../domain/models/user'
import { UpdateStatusUser } from '../../../domain/usecases/update-status-user'
import { UpdateStatusUserRepository } from '../../protocols/update-status-user-repository'

export class DataUpdateStatusUser implements UpdateStatusUser {
  private readonly updateStatusUserRepository: UpdateStatusUserRepository

  constructor (updateStatusUserRepository: UpdateStatusUserRepository) {
    this.updateStatusUserRepository = updateStatusUserRepository
  }

  async updateStatusById (id: number, status: boolean): Promise<UserModel> {
    return await this.updateStatusUserRepository.updateStatusById(id, status)
  }
}
