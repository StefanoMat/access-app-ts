import { Request, Response, NextFunction } from 'express'
import { adaptMiddleware } from '../adapters/express-middlaware-adapter'
import { makeAuthMiddleware } from '../factories/auth-middleware'
import { TypeEnum } from '../../domain/models/enum/type-enum'

export const auth = (role?: TypeEnum[]): (req: Request, res: Response, next: NextFunction) => Promise<void> => {
  return adaptMiddleware(makeAuthMiddleware(role))
}
