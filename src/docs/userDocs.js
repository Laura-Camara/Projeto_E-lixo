export const userPaths = {

  "/api/elixo/users/": { 
    get: {
      tags: ["Usuários"],
      summary: "Lista todos os usuários",
      security: [
        { bearerAuth: [] } // Protege a rota exigindo o token JWT
      ],
      responses: {
        200: { 
            description: "Lista de usuários retornada com sucesso.",
            schema: {
            type: "array",
            items: { $ref: "#/components/schemas/Usuario" } // Retorna um array de Usuários
          } 
        },
        401: { description: "Não autorizado." }
      }
    },
    post: {
      tags: ["Usuários"],
      summary: "Cadastra um novo usuário (Cidadão)",
      // Sem security porque é pública no Express
      requestBody: { 
        required: true,
        content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Usuario" }
      }
    }
  },
      responses: {
        201: {
          description: "Usuário cadastrado com sucesso.",
          schema: {
            $ref: "#/components/schemas/Usuario"
          }
        },
        400: {
          description: "Erro de validação nos dados enviados."
        },
      }
    }
  },
  
  "/api/elixo/users/{id}": {
    get: {
      tags: ["Usuários"],
      summary: "Busca um usuário específico pelo ID",
      security: [
        { bearerAuth: [] } // Protege a rota exigindo o token JWT
      ],
      parameters: [
        { 
          in: "path", 
          name: "id", 
          required: true, 
          schema: { type: "string" } 
        }
      ],
      responses: {
        200: { 
            description: "Usuário encontrado.",
            schema: { $ref: "#/components/schemas/Usuario" } 
        },
        401: { description: "Não autorizado." }
      }
    },
    patch: {
      tags: ["Usuários"],
      summary: "Atualiza os dados de um usuário específico pelo ID",
      security: [
        { bearerAuth: [] } // Protege a rota exigindo o token JWT
      ],
      parameters: [
        { 
          in: "path", 
          name: "id", 
          required: true, 
          schema: { type: "string" }
        }
      ],
      responses: {
        200: { description: "Dados do usuário atualizados com sucesso." },
        401: { description: "Não autorizado." }
      }
    },
    delete: {
      tags: ["Usuários"],
      summary: "Deleta um usuário específico pelo ID",
      security: [
        { bearerAuth: [] } // Protege a rota exigindo o token JWT
      ],
      parameters: [
        { 
          in: "path", 
          name: "id", 
          required: true, 
          schema: { type: "string" } 
        }
      ],
      responses: {
        200: { description: "Usuário deletado." },
        401: { description: "Não autorizado." }
      }
    }
  }
};