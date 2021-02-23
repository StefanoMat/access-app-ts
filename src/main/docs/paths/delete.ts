
export const deletePath = {
  tags: ['Usuario'],
  summary: 'Deletar o usuário',
  description: 'Essa rota pode ser acessada por usuários ROOT',
  responses: {
    204: {
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
