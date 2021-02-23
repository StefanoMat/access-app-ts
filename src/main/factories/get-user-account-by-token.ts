import { GetUserAccountByToken } from '../../domain/usecases/get-user-account-by-token'
import { JwtAdapter } from '../../infra/criptography/jwt-adapter'
import { UserAccountRepository } from '../../infra/db/postgres/user-repository/user-account'
import { DataGetUserAccountByToken } from '../../data/usecases/get-user-account/data-get-user-account-by-token'

export const makeDataGetUserAccountByToken = (): GetUserAccountByToken => {
  const jwtAdapter = new JwtAdapter(process.env.JWT_SECRET)
  const userAccountRepository = new UserAccountRepository()
  return new DataGetUserAccountByToken(jwtAdapter, userAccountRepository)
}
