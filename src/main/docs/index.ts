import paths from './paths'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Access App - Gerenciamento de usuários',
    description: 'Projeto realizado para Devires. Utilizando conceitos de DDD, clean archietecture e SOLID',
    version: '1.0.0'
  },
  externalDocs: {
    description: 'Postman Collection',
    url: 'wwww.google.com'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Acesso',
    description: 'Rotas para logn e cadastro'
  }, {
    name: 'Gerenciamento',
    description: 'Rotas para exlcuir e editar um usuário'
  }],
  paths
}
