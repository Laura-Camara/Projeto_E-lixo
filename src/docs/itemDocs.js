export const itemPaths = {
  "/api/elixo/users/itens/": { 
    get: {
      tags: ["Itens"],
      summary: "Lista todos os itens coletáveis",
      description: "**Acesso: Admin ou Empresa Parceira.** Retorna a listagem geral de todos os resíduos eletrônicos cadastrados no sistema que aguardam coleta.",      security: [
        { bearerAuth: [] } // Protege a rota exigindo o token JWT
      ],
      responses: {
        200: { 
          description: "Lista de itens coletáveis retornada com sucesso.",
          schema: {
            type: "array",
            items: { $ref: "#/components/schemas/ItemResiduo" }
          }
        },
        401: { description: "Não autorizado." }
      }
    },
    post: {
      tags: ["Itens"],
      summary: "Cadastra um novo resíduo eletrônico",
      description: "**Acesso: Usuário (Cidadão).** Permite o cadastro de um novo item de e-lixo informando localização, tipo e condição.",
      security: [
        { bearerAuth: [] } // Protege a rota exigindo o token JWT
      ],
      requestBody: { 
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
      description: "**Acesso: Admin, Empresa ou o Usuário dono do item.** Retorna as informações detalhadas de um resíduo eletrônico específico.",
      security: [
        { bearerAuth: [] } // Protege a rota exigindo o token JWT
      ],
      parameters: [
        { in: "path", name: "id", required: true, schema: { type: "string" } }
      ],
      responses: {
        200: { 
          description: "Item encontrado com sucesso.",
          schema: { $ref: "#/components/schemas/ItemResiduo" }
        },
        401: { description: "Não autorizado." }
      }
    },
    put: {
      tags: ["Itens"],
      summary: "Atualiza um item específico pelo ID",
      description: "**Acesso: Usuário dono do item.** Permite modificar os detalhes cadastrais do resíduo eletrônico antes de ser coletado.",
      security: [
        { bearerAuth: [] } // Protege a rota exigindo o token JWT
      ],
      parameters: [
        { in: "path", name: "id", required: true, schema: { type: "string" } }
      ],
      requestBody: { 
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ItemResiduo" }
          }
        }
      },
      responses: {
        200: { description: "Item atualizado com sucesso." },
        400: { description: "Erro de validação nos dados enviados." },
        401: { description: "Não autorizado." }
      }
    },
    delete: {
      tags: ["Itens"],
      summary: "Deleta um item específico pelo ID",
      description: "**Acesso: Usuário dono do item.** Cancela o descarte e remove o registro do resíduo eletrônico da plataforma.",
      security: [
        { bearerAuth: [] } // Protege a rota exigindo o token JWT
      ],
      parameters: [
        { in: "path", name: "id", required: true, schema: { type: "string" } }
      ],
      responses: {
        200: { description: "Item deletado com sucesso do sistema." },
        401: { description: "Não autorizado." }
      }
    }
  },

  "/api/elixo/users/itens/inventario": {
    get: {
      tags: ["Itens"],
      summary: "Lista o inventário",
      description: "**Acesso: Usuário dono do item.** Retorna o inventário com detalhes de todos os resíduos armazenados para descarte do usuário.",
      security: [
        { bearerAuth: [] } // Protege a rota exigindo o token JWT
      ],
      responses: {
        200: { 
          description: "Inventário retornado com sucesso contendo a lista de resíduos.",
          schema: {
            type: "array",
            items: { $ref: "#/components/schemas/ItemResiduo" }
          }
        },
        401: { description: "Não autorizado." }
      }
    }
  },

  "/api/elixo/users/itens/{id}/coletar": {
    patch: {
      tags: ["Itens"],
      summary: "Atualiza o status do item para coletado pelo ID",
      description: "**Acesso exclusivo: Empresa Parceira.** Registra que a coleta física do resíduo eletrônico foi realizada com sucesso pela instituição.",
      security: [
        { bearerAuth: [] } // Protege a rota exigindo o token JWT
      ],
      parameters: [
        { in: "path", name: "id", required: true, schema: { type: "string" } }
      ],
      responses: {
        200: { description: "Item marcado como coletado com sucesso no ecossistema." },
        401: { description: "Não autorizado." }
      }
    }
  }
};