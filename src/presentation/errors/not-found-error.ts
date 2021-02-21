export class NotFoundError extends Error {
  constructor (resource: string) {
    super(`Resource Not Found: ${resource}`)
    this.name = 'NotFoundError'
  }
}
