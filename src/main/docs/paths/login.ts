
export const loginPath = {
  post: {
    tags: ['Login'],
    summary: 'Autenticar usuário',
    description: 'Essa rota pode ser acessada por todos os usuários',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              email: {
                type: 'string'
              },
              password: {
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
}
