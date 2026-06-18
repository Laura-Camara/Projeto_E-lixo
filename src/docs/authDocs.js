export const authPaths = {
  "/api/elixo/auth/user": {
    post: {
      tags: ["Autenticação"],
      summary: "Realiza o login do Cidadão/Usuário",
      requestBody: { 
        required: true,
        content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Login" }
      }
    }
  },
      responses: {
        200: { 
          description: "Autenticação bem-sucedida. Retorna o Token JWT.",
          schema: {
            type: "object",
            properties: { token: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." } }
          }
        },
        401: { description: "Credenciais inválidas." }
      }
    }
  },
  "/api/elixo/auth/empresa": {
    post: {
      tags: ["Autenticação"],
      summary: "Realiza o login da Empresa Parceira",
      parameters: [
        {
          in: "body",
          name: "body",
          required: true,
          schema: { $ref: "#/components/schemas/Login" }
        }
      ],
      responses: {
        200: { 
          description: "Autenticação bem-sucedida. Retorna o Token JWT.",
          schema: {
            type: "object",
            properties: { token: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." } }
          }
        },
        401: { description: "Credenciais inválidas." }
      }
    }
  }
};