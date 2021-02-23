
export const findPath = {
  tags: ['Usuario'],
  summary: 'Retornar dados do usuário',
  description: 'Essa rota pode ser acessada por usuários ROOT',
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
