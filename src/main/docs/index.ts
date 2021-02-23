import { loginPath, findPath, updatePath, updateStatusPath, deletePath, registerPath, listTypePath } from './paths/'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Access App - Gerenciamento de usuários',
    description: 'Projeto realizado para Devires. Utilizando conceitos de DDD, clean archietecture e SOLID',
    version: '1.0.0'
  },
  externalDocs: {
    description: 'Acesse o Postman Collection pelo link:',
    url: 'https://www.getpostman.com/collections/8355d048762873a61e3e'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Acesso',
    description: 'Rotas para login e cadastro'
  }, {
    name: 'Usuario',
    description: 'Rotas para exlcuir e editar um usuário'
  }],
  paths: {
    '/user/{id}': {
      get: findPath,
      patch: updatePath,
      delete: deletePath
    },
    '/user/{id}/status': {
      patch: updateStatusPath
    },
    '/user/login': {
      post: loginPath
    },
    '/user/register': {
      post: registerPath
    },
    '/type': {
      get: listTypePath
    }
  }
}
