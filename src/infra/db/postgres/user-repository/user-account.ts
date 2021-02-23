import { GetUserAccountRepository } from '../../../../data/protocols/get-user-account-repository'
import { UserModel } from '../../../../domain/models/user'
import { getConnection } from 'typeorm'
import { GetUserAccountByIdAndRoleRepository } from '../../../../data/protocols/get-user-account-by-token-repository'
import { TypeEnum } from '../../../../domain/models/enum/type-enum'

export class UserAccountRepository implements GetUserAccountRepository, GetUserAccountByIdAndRoleRepository {
  async getByEmail (email: string): Promise<UserModel> {
    const result = await getConnection().createQueryBuilder()
      .select('id, name, password, email, type_id, status')
      .from('public.user', 'u')
      .where('u.email = :email', { email: email })
      .getRawOne()
    return result
  }

  async getByIdAndRole (id: string, role?: TypeEnum[]): Promise<GetUserAccountByIdAndRoleRepository.Result> {
    const result = await getConnection().createQueryBuilder()
      .select('id')
      .from('public.user', 'u')
      .where('u.id = :id', { id: id })
      .andWhere('u.type_id IN (:...type)', { type: role || [null] })
      .getRawOne()
    return result
  }
}
