import { GetUserAccountByToken } from '../../../domain/usecases/get-user-account-by-token'
import { GetUserAccountByIdAndRoleRepository } from '../../protocols/get-user-account-by-token-repository'
import { Decrypter } from '../../protocols/cryptography/decrypter'
import { TypeEnum } from '../../../domain/models/enum/type-enum'

export class DataGetUserAccountByToken implements GetUserAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly getUserAccountByIdAndRoleRepository: GetUserAccountByIdAndRoleRepository
  ) {}

  async getByToken (accessToken: string, role?: TypeEnum[]): Promise<GetUserAccountByToken.Result> {
    let token: string
    try {
      token = await this.decrypter.decrypt(accessToken)
    } catch (error) {
      return null
    }
    if (token) {
      const dataToken = (token as unknown) as GetUserAccountByToken.Result
      const account = await this.getUserAccountByIdAndRoleRepository.getByIdAndRole(dataToken.id, role)
      if (account) {
        return account
      }
    }
    return null
  }
}
