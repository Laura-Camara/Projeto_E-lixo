export const empresaPaths = {

  "/api/elixo/empresas/": { 
    get: {
      tags: ["Empresas"],
      summary: "Lista todas as empresas",
      security: [
        { bearerAuth: [] } // Protege a rota exigindo o token JWT
      ],
      responses: {
        200: { 
            description: "Lista de empresas retornada com sucesso.",
            schema: {
            type: "array",
            items: { $ref: "#/components/schemas/Empresa" } // Retorna um array de Usuários
          } 
        },
        401: { description: "Não autorizado." }
      }
    },
    post: {
      tags: ["Empresas"],
      summary: "Cadastra uma nova empresa",
      // Sem security porque é pública no Express
      requestBody: { 
        required: true,
        content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Empresa" }
      }
    }
  },
      responses: {
        201: {
          description: "Empresa cadastrada com sucesso.",
          schema: {
            $ref: "#/components/schemas/Empresa"
          }
        },
        400: {
          description: "Erro de validação nos dados enviados."
        },
      }
    }
  },
  
  "/api/elixo/empresas/{id}": {
    get: {
      tags: ["Empresas"],
      summary: "Busca uma empresa específica pelo ID",
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
            description: "Empresa encontrada.",
            schema: { $ref: "#/components/schemas/Empresa" } 
        },
        401: { description: "Não autorizado." }
      }
    },
    patch: {
      tags: ["Empresas"],
      summary: "Atualiza os dados de uma empresa específica pelo ID",
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
        200: { description: "Dados da empresa atualizados com sucesso." },
        401: { description: "Não autorizado." }
      }
    },
    delete: {
      tags: ["Empresas"],
      summary: "Deleta a conta de uma empresa específica pelo ID",
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
        200: { description: "Empresa removida do sistema com sucesso." },
        401: { description: "Não autorizado." }
      }
    }
  }
};