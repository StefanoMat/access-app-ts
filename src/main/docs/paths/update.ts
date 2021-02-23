
export const updatePath = {
  tags: ['Usuario'],
  summary: 'Atulizar nome e tipo do usuário',
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
            typeId: {
              type: 'string'
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
