import bcrypt from 'bcrypt'
import { Encrypter } from '../../data/protocols/cryptography/encrypter'
import { HashComparer } from '../../data/protocols/cryptography/hash-comparer'

export class BcryptAdapter implements Encrypter, HashComparer {
  private readonly salt: number

  constructor (salt: number) {
    this.salt = salt
  }

  async encrypt (value: string): Promise<string> {
    return bcrypt.hash(value, this.salt)
  }

  async compare (plaintext: string, encrypted: string): Promise<boolean> {
    return bcrypt.compare(plaintext, encrypted)
  }
}
