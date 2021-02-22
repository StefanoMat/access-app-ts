import { AddUserRepository } from '../../../../data/protocols/add-user-repository'
import { AddUserModel } from '../../../../domain/usecases/add-user'
import { UserModel } from '../../../../domain/models/user'
import { getConnection } from 'typeorm'
import { GetUserRepository } from '../../../../data/protocols/get-user-repository'
import { UpdateUserRepository } from '../../../../data/protocols/update-user-repository'
import { UpdateUserModel } from '../../../../domain/usecases/update-user'
import { UpdateStatusUser } from '../../../../domain/usecases/update-status-user'

export class UserRepository implements AddUserRepository, GetUserRepository, UpdateUserRepository, UpdateStatusUser {
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

  async updateById (id: number, data: UpdateUserModel): Promise<UserModel> {
    const query = await getConnection().createQueryBuilder()
      .update('public.user')
    if (data.name) {
      query.set({
        name: data.name
      })
    }
    if (data.typeId) {
      query.set({
        type_id: data.typeId
      })
    }
    const result = await query.where('id = :id', { id: id })
      .returning('id, name, email, type_id, status')
      .execute()
    return result.raw[0]
  }

  async updateStatusById (id: number, status: boolean): Promise<UserModel> {
    const result = await getConnection().createQueryBuilder()
      .update('public.user')
      .set({
        status: status
      })
      .where('id = :id', { id: id })
      .returning('id, name, email, type_id, status')
      .execute()
    return result.raw[0]
  }
}
