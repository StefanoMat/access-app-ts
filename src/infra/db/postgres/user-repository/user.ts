import { AddUserRepository } from '../../../../data/protocols/add-user-repository'
import { AddUserModel } from '../../../../domain/usecases/add-user'
import { UserModel } from '../../../../domain/models/user'
import { getConnection } from 'typeorm'

export class UserRepository implements AddUserRepository {
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
}
