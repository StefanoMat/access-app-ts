import { TypeEnum } from '../../domain/models/enum/type-enum'

export interface GetUserAccountByIdAndRoleRepository {
  getByIdAndRole: (id: string, role?: TypeEnum[]) => Promise<GetUserAccountByIdAndRoleRepository.Result>
}

export namespace GetUserAccountByIdAndRoleRepository {
  export interface Result {
    id: string
  }
}
