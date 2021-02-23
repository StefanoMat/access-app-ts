import jwt from 'jsonwebtoken'
import { Encrypter } from '../../data/protocols/cryptography/encrypter'
import { Decrypter } from '../../data/protocols/cryptography/decrypter'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) {}

  async encrypt (plaintext: string): Promise<string> {
    return jwt.sign({ id: plaintext }, this.secret, {
      expiresIn: 60 * 15
    })
  }

  async decrypt (hashedValue: string): Promise<string> {
    return jwt.verify(hashedValue, this.secret) as string
  }
}
