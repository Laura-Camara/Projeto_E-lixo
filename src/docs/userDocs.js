export const userPaths = {

  "/api/elixo/users/": { 
    get: {
      tags: ["Usuários"],
      summary: "Lista todos os usuários",
      description: "**Acesso exclusivo: Admin.** Retorna a listagem completa da base de dados de usuários para controle e auditoria.",
      security: [
        { bearerAuth: [] }
      ],
      responses: {
        200: { 
          description: "Lista de usuários retornada com sucesso.",
          schema: {
            type: "array",
            items: { $ref: "#/components/schemas/Usuario" }
          } 
        },
        401: { description: "Não autorizado." }
      }
    },
    post: {
      tags: ["Usuários"],
      summary: "Cadastra um novo usuário",
      description: "**Acesso: Público.** Permite o cadastro de cidadãos na plataforma.",
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
        }
      }
    }
  },
  
  "/api/elixo/users/{id}": {
    get: {
      tags: ["Usuários"],
      summary: "Busca um usuário pelo ID",
      description: "**Acesso: Admin ou o próprio User.** Permite visualizar os detalhes do perfil individual.",
      security: [
        { bearerAuth: [] }
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
          description: "Sucesso.",
          schema: { $ref: "#/components/schemas/Usuario" } 
        },
        401: { description: "Não autorizado." }
      }
    },
    patch: {
      tags: ["Usuários"],
      summary: "Atualiza os dados de um usuário pelo ID",
      description: "**Acesso: Admin ou o próprio User.** Permite editar os dados parciais do perfil.",
      security: [
        { bearerAuth: [] }
      ],
      parameters: [
        { 
          in: "path", 
          name: "id", 
          required: true, 
          schema: { type: "string" }
        }
      ],
      requestBody: { 
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Usuario" }
          }
        }
      },
      responses: {
        200: { description: "Dados do usuário atualizados com sucesso." },
        400: { description: "Erro de validação nos dados enviados." },
        401: { description: "Não autorizado." }
      }
    },
    delete: {
      tags: ["Usuários"],
      summary: "Deleta um usuário pelo ID",
      description: "**Acesso exclusivo: Próprio User.** Permite ao cidadão a exclusão definitiva da sua conta e a remoção de seus dados.",
      security: [
        { bearerAuth: [] }
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
        200: { description: "Usuário deletado com sucesso." },
        401: { description: "Não autorizado." }
      }
    }
  }
};