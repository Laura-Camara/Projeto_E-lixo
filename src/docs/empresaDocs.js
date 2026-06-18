export const empresaPaths = {

  "/api/elixo/empresas/": { 
    get: {
      tags: ["Empresas"],
      summary: "Lista todas as empresas",
      description: "**Acesso exclusivo: Admin.** Retorna a listagem completa da base de dados de empresas para controle e auditoria.",
      security: [
        { bearerAuth: [] } // Protege a rota exigindo o token JWT
      ],
      responses: {
        200: { 
          description: "Lista de empresas retornada com sucesso.",
          schema: {
            type: "array",
            items: { $ref: "#/components/schemas/Empresa" } 
          } 
        },
        401: { description: "Não autorizado." }
      }
    },
    post: {
      tags: ["Empresas"],
      summary: "Cadastra uma nova empresa",
      description: "**Acesso: Público.** Permite o cadastro de novas empresas e cooperativas de reciclagem parceiras.",
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
        }
      }
    }
  },
  
  "/api/elixo/empresas/{id}": {
    get: {
      tags: ["Empresas"],
      summary: "Busca uma empresa específica pelo ID",
      description: "**Acesso: Admin ou a própria Empresa.** Permite visualizar os detalhes do perfil institucional da empresa.",
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
      description: "**Acesso: Admin ou a própria Empresa.** Permite editar os dados cadastrais, contatos ou localização geográfica da instituição.",
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
      requestBody: { 
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Empresa" }
          }
        }
      },
      responses: {
        200: { description: "Dados da empresa atualizados com sucesso." },
        400: { description: "Erro de validação nos dados enviados." },
        401: { description: "Não autorizado." }
      }
    },
    delete: {
      tags: ["Empresas"],
      summary: "Deleta a conta de uma empresa específica pelo ID",
      description: "**Acesso exclusivo: Própria Empresa.** Permite à empresa solicitar a remoção definitiva de sua conta da plataforma.",
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