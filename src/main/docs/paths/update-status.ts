
export const updateStatusPath = {
  tags: ['Usuario'],
  summary: 'Atulizar status do usuário',
  description: 'Essa rota pode ser acessada por usuários ROOT e ADMIN',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
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
