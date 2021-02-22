export interface DeleteUser {
  deleteById: (id: number) => Promise<boolean>
}
