import { HttpResponse } from '../protocols/http'
import { ServerError } from '../errors'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const notFound = (error: Error): HttpResponse => ({
  statusCode: 404,
  body: error
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null
})
