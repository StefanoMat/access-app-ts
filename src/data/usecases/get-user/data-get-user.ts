import { GetUser } from '../../../domain/usecases/get-user'
import { GetUserRepository } from '../../protocols/get-user-repository'
import { UserModel } from '../../../domain/models/user'

export class DataGetUser implements GetUser {
  private readonly getUserRepository: GetUserRepository

  constructor (getUserRepository: GetUserRepository) {
    this.getUserRepository = getUserRepository
  }

  async getById (param: number): Promise<UserModel> {
    return await this.getUserRepository.getById(param)
  }
}
