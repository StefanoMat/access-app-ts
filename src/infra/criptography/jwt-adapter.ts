import jwt from 'jsonwebtoken'

export class JwtAdapter {
  constructor (private readonly secret: string) {}

  async encrypt (plaintext: string): Promise<string> {
    return jwt.sign({ id: plaintext }, this.secret, {
      expiresIn: 60 * 15
    })
  }

  async decrypt (ciphertext: string): Promise<string> {
    return jwt.verify(ciphertext, this.secret) as string
  }
}
