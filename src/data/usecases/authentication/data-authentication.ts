import { Authentication } from '../../../domain/usecases/authtentication'
import { GetUserAccountRepository } from '../../protocols/get-user-account-repository'
import { HashComparer } from '../../protocols/cryptography/hash-comparer'
import { Encrypter } from '../../protocols/cryptography/encrypter'

export class DataAuthentication implements Authentication {
  constructor (
    private readonly getUserAccountRepository: GetUserAccountRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter
  ) {}

  async auth (authParams: Authentication.Params): Promise<Authentication.Result> {
    const userAccount = await this.getUserAccountRepository.getByEmail(authParams.email)
    if (userAccount) {
      const isPasswordCorrect = await this.hashComparer.compare(authParams.password, userAccount.password)
      if (isPasswordCorrect) {
        const accessToken = await this.encrypter.encrypt(String(userAccount.id))
        return {
          accessToken,
          email: userAccount.email
        }
      }
    }
    return null
  }
}
