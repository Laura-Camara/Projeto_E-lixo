export const itemPaths = {

  "/api/elixo/users/itens/": { 
    get: {
      tags: ["Itens"],
      summary: "Lista todos os itens coletáveis",
      description: "**Acesso: Admin ou Empresa Parceira.** Retorna a listagem geral de todos os resíduos eletrônicos cadastrados no sistema que aguardam coleta.",
      security: [
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
      description: "**Acesso: Usuário (Cidadão) ou Admin.** Permite o cadastro de um novo item de e-lixo no ecossistema. O Admin pode utilizar esta rota para realizar lançamentos manuais via suporte.",
      security: [
        { bearerAuth: [] }
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
        201: {
          description: "Item cadastrado com sucesso.",
          schema: { $ref: "#/components/schemas/ItemResiduo" }
        },
        400: { description: "Erro de validação nos dados enviados." },
        401: { description: "Não autorizado (Token JWT ausente ou inválido)." }
      }
    }
  },
  
  "/api/elixo/users/itens/{id}": {
    get: {
      tags: ["Itens"],
      summary: "Busca um item específico pelo ID",
      description: "**Acesso: Admin, Empresa ou Usuário.** Retorna as informações detalhadas de um resíduos eletrônico específico a partir do ID selecionado na listagem ou mapa.",
      security: [
        { bearerAuth: [] }
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
      description: "**Acesso: Usuário dono ou Admin (Moderação).** Permite modificar os detalhes cadastrais do resíduo eletrônico. O Admin possui este privilégio para atuar na correção ou reclassificação de dados incorretos.",
      security: [
        { bearerAuth: [] }
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
      description: "**Acesso: Usuário dono ou Admin (Moderação).** Cancela o descarte e remove o registro do sistema. O Admin possui este privilégio para fins de moderação, saneamento da base de dados e eliminação de registros falsos (poluição do sistema).",
      security: [
        { bearerAuth: [] }
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
      summary: "Lista o inventário do usuário logado",
      description: "**Acesso exclusivo: Usuário (Cidadão).** Funciona como uma área pessoal logada (estilo 'Meus Pedidos'). Retorna o histórico de descarte e o estado atual de todos os resíduos cadastrados especificamente pelo cidadão autenticado.",
      security: [
        { bearerAuth: [] }
      ],
      responses: {
        200: { 
          description: "Inventário pessoal do usuário retornado com sucesso.",
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
      description: "**Acesso exclusivo: Empresa Parceira.** Registra que a coleta física do resíduo eletrônico foi realizada com sucesso no mundo real pela instituição, alterando seu estado final para 'coletado'.",
      security: [
        { bearerAuth: [] }
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