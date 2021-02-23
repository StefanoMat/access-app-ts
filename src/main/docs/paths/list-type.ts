
export const listTypePath = {
  tags: ['Tipo'],
  summary: 'Retornar todos os tipos de usuário',
  description: 'Essa rota pode ser acessada por todos os usuário',
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
