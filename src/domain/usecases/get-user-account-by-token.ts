
export interface GetUserAccountByToken {
  getByToken: (token: string, role?: string) => Promise<GetUserAccountByToken.Result>
}
export namespace GetUserAccountByToken {
  export interface Result {
    id: string
  }
}
