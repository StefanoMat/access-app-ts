import { AddUserRepository } from '../../../../data/protocols/add-user-repository'
import { AddUserModel } from '../../../../domain/usecases/add-user'
import { UserModel } from '../../../../domain/models/user'
import { getConnection } from 'typeorm'
import { GetUserRepository } from '../../../../data/protocols/get-user-repository'

export class UserRepository implements AddUserRepository, GetUserRepository {
  async add (userData: AddUserModel): Promise<UserModel> {
    const result = await getConnection().createQueryBuilder()
      .insert()
      .into('public.user')
      .values({
        name: userData.name,
        password: userData.password,
        email: userData.email,
        type_id: userData.typeId,
        status: userData.status
      })
      .returning('*')
      .execute()
    return result.raw
  }

  async getById (id: number): Promise<UserModel> {
    const result = await getConnection().createQueryBuilder()
      .select('id, name, email, type_id, status')
      .from('public.user', 'u')
      .where('u.id = :id', { id: id })
      .getRawOne()
    return result
  }
}
