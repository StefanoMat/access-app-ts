export interface DeleteUserRepository{
  deleteById: (id: number) => Promise<boolean>
}
