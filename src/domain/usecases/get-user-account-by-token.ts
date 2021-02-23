import { TypeEnum } from '../models/enum/type-enum'
export interface GetUserAccountByToken {
  getByToken: (token: string, role?: TypeEnum[]) => Promise<GetUserAccountByToken.Result>
}
export namespace GetUserAccountByToken {
  export interface Result {
    id: string
  }
}
