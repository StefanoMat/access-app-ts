
export const registerPath = {
  tags: ['Acesso'],
  summary: 'Cadastrar usuário',
  description: 'Essa rota pode ser acessada por usuários ROOT e ADMIN',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            name: {
              type: 'string'
            },
            email: {
              type: 'string'
            },
            password: {
              type: 'string'
            },
            typeId: {
              type: 'integer'
            },
            status: {
              type: 'boolean'
            }
          }
        }
      }
    }
  },
  responses: {
    200: {
      description: 'Sucesso',
      content: {
        'application/json': {
          schema: {
          }
        }
      }
    }
  }
}
