export const itemPaths = {
  // 🎯 Atenção à barra final se o seu Express gerou com ela!
  "/api/elixo/users/itens/": { 
    get: {
      tags: ["Itens"],
      summary: "Lista todos os itens coletáveis",
      security: [
        { bearerAuth: [] } // Protege a rota exigindo o token JWT
      ],
      responses: {
        200: { description: "Lista retornada com sucesso." },
        401: { description: "Não autorizado." }
      }
    },
    post: {
      tags: ["Itens"],
      summary: "Cadastra um novo resíduo eletrônico",
      security: [
        { bearerAuth: [] } // Protege a rota exigindo o token JWT
      ],
      requestBody: { // 🎯 Substituído 'parameters' por 'requestBody'
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ItemResiduo"
            }
          }
        }
      },
      responses: {
        201: {
          description: "Item cadastrado com sucesso.",
          schema: {
            $ref: "#/components/schemas/ItemResiduo"
          }
        },
        400: {
          description: "Erro de validação nos dados enviados."
        },
        401: {
          description: "Não autorizado (Token JWT ausente ou inválido)."
        }
      }
    }
  },
  
  "/api/elixo/users/itens/{id}": {
    get: {
      tags: ["Itens"],
      summary: "Busca um item específico pelo ID",
      security: [
        { bearerAuth: [] } // Protege a rota exigindo o token JWT
      ],
      parameters: [
        { in: "path", name: "id", required: true, schema: { type: "string" } }
      ],
      responses: {
        200: { description: "Item encontrado." },
        401: { description: "Não autorizado." }
      }
    },
    put: {
      tags: ["Itens"],
      summary: "Atualiza um item específico pelo ID",
      security: [
        { bearerAuth: [] } // Protege a rota exigindo o token JWT
      ],
      parameters: [
        { in: "path", name: "id", required: true, schema: { type: "string" } }
      ],
      responses: {
        200: { description: "Item atualizado." },
        401: { description: "Não autorizado." }
      }
    },
    delete: {
      tags: ["Itens"],
      summary: "Deleta um item específico pelo ID",
      security: [
        { bearerAuth: [] } // Protege a rota exigindo o token JWT
      ],
      parameters: [
        { in: "path", name: "id", required: true, schema: { type: "string" } }
      ],
      responses: {
        200: { description: "Item deletado." },
        401: { description: "Não autorizado." }
      }
    }
  },

  "/api/elixo/users/itens/inventario": {
    get: {
      tags: ["Itens"],
      summary: "Lista o inventário",
      security: [
        { bearerAuth: [] } // Protege a rota exigindo o token JWT
      ],
      responses: {
        200: { description: "Inventário retornado com sucesso" },
        401: { description: "Não autorizado." }
      }
    }
  },

  "/api/elixo/users/itens/{id}/coletar": {
    patch: {
      tags: ["Itens"],
      summary: "Atualiza o status do item para coletado pelo ID",
      security: [
        { bearerAuth: [] } // Protege a rota exigindo o token JWT
      ],
      parameters: [
        { in: "path", name: "id", required: true, schema: { type: "string" } }
      ],
      responses: {
        200: { description: "Item coletado" },
        401: { description: "Não autorizado." }
      }
    }
    
  }
};