import { GetUserAccountRepository } from '../../../../data/protocols/get-user-account-repository'
import { UserModel } from '../../../../domain/models/user'
import { getConnection } from 'typeorm'

export class UserAccountRepository implements GetUserAccountRepository {
  async getByEmail (email: string): Promise<UserModel> {
    const result = await getConnection().createQueryBuilder()
      .select('id, name, password, email, type_id, status')
      .from('public.user', 'u')
      .where('u.email = :email', { email: email })
      .getRawOne()
    return result
  }
}
