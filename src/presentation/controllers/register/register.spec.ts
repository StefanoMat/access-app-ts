import { RegisterController } from './register'
import { badRequest } from '../helpers/http-helper'
import { MissingParamError } from '../errors/missing-param-error'

describe('Register Controller', () => {
  test('Should return 400 if no name is provided', async () => {
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_pass',
        tipoId: 1,
        status: true
      }
    }
    const controller = new RegisterController()
    const httpResponse = await controller.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  })

  test('Should return 400 if no email is provided', async () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_pass',
        tipoId: 1,
        status: true
      }
    }
    const controller = new RegisterController()
    const httpResponse = await controller.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Should return 400 if no password is provided', async () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        tipoId: 1,
        status: true
      }
    }
    const controller = new RegisterController()
    const httpResponse = await controller.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })

  test('Should return 400 if no tipoId is provided', async () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_pass',
        status: true
      }
    }
    const controller = new RegisterController()
    const httpResponse = await controller.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('tipoId')))
  })

  test('Should return 400 if no status is provided', async () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_pass',
        tipoId: 1
      }
    }
    const controller = new RegisterController()
    const httpResponse = await controller.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('status')))
  })
})
