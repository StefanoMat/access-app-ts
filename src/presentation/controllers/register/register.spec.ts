import { RegisterController } from './register'
import { badRequest } from '../helpers/http-helper'
import { MissingParamError } from '../errors/missing-param-error'

describe('Register Controller', () => {
  test('Should return 400 if no name is provided', async () => {
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_pass',
        tipo_id: 1,
        status: true
      }
    }
    const controller = new RegisterController()
    const httpResponse = await controller.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  })
})
