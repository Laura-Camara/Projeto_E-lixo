import { itemPaths } from "./src/docs/itemDocs.js";
import { userPaths } from "./src/docs/userDocs.js";
import { empresaPaths } from "./src/docs/empresaDocs.js";
import { authPaths } from "./src/docs/authDocs.js";

const loginSchema = {
  type: "object",
  required: ["login", "senha"],
  properties: {
    login: { 
      type: "string", 
      example: "username", 
      description: "O identificador único/username escolhido pelo usuário ou empresa." 
    },
    senha: { 
      type: "string", 
      format: "password", 
      example: "senhaSegura123" 
    }
  }
};

const userSchema = {
  type: "object",
  required: ["nome", "login", "email", "senha"], // Campos obrigatórios no cadastro
  properties: {
    nome: { 
      type: "string", 
      example: "Carla" 
    },
    login: { 
      type: "string", 
      example: "carla_elixo" 
    },
    email: { 
      type: "string", 
      format: "email", 
      example: "carla@exemplo.com" 
    },
    senha: { 
      type: "string", 
      format: "password", 
      example: "senhaSegura123" 
    },
    role: { 
      type: "string", 
      enum: ["user", "admin"], 
      default: "user",
      example: "user",
      readOnly: true 
    },
    endereco: {
      type: "object",
      description: "Endereço residencial do cidadão",
      properties: {
        rua: { type: "string", example: "Av. Salgado Filho" },
        numero: { type: "string", example: "1234" },
        bairro: { type: "string", example: "Lagoa Nova" },
        cidade: { type: "string", example: "Natal" },
        uf: { type: "string", maxLength: 2, example: "RN" },
        cep: { type: "string", example: "59000-000" }
      }
    }
  }
};

const empresaSchema = {
  type: "object",
  required: ["razaoSocial", "cnpj", "login", "email", "senha", "telefone", "endereco"], // Campos obrigatórios no cadastro
  properties: {
    razaoSocial: { 
      type: "string", 
      example: "EcoDescarte Reciclagem LTDA" 
    },
    cnpj: { 
      type: "string", 
      example: "12.345.678/0001-99" 
    },
    login: { 
      type: "string", 
      example: "ecodescarte_oficial" 
    },
    email: { 
      type: "string", 
      format: "email", 
      example: "ecodescarte@exemplo.com" 
    },
    senha: { 
      type: "string", 
      format: "password", 
      example: "senhaSegura123" 
    },
    role: { 
      type: "string", 
      enum: ["empresa"], 
      default: "empresa",
      example: "empresa" 
    },
    endereco: {
      type: "object",
      properties: {
        rua: { type: "string", example: "Rua das Acácias" },
        numero: { type: "string", example: "500" },
        bairro: { type: "string", example: "Distrito Industrial" },
        cidade: { type: "string", example: "Natal" },
        uf: { type: "string", maxLength: 2, example: "RN" },
        cep: { type: "string", example: "59000-111" }
      }
    }
  }
};

const itemSchema = {
  type: "object",
  required: ["tipo", "marca", "quantidade", "linha", "localizacao"],
  properties: {
    tipo: { type: "string", example: "Monitor CRT" },
    marca: { type: "string", example: "Samsung" },
    condicao: { type: "string", enum: ["funcional", "defeituoso", "sucata"], example: "defeituoso" },
    descricao: { type: "string", maxLength: 500, example: "Tela trincada." },
    quantidade: { type: "integer", minimum: 1, default: 1, example: 1 },
    linha: { type: "string", enum: ["verde", "azul", "marrom", "branca"], example: "azul" },
    localizacao: {
      type: "object",
      required: ["lat", "lng"],
      properties: {
        lat: { type: "number", example: -5.7954 },
        lng: { type: "number", example: -35.2120 }
      }
    }
  }
};

const swaggerSpec = {
  openapi: '3.0.0', // Usando a versão moderna do OpenAPI
  info: {
    title: 'PLATAFORMA DE INVENTÁRIO E DESCARTE DE E-LIXO',
    version: '1.0.0',
    description: 'Documentação limpa feita manualmente com objetos JavaScript Puros.'
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor Local'
    }
  ],
  tags: [
    { name: 'Autenticação', description: 'Endpoints relacionados ao login.' },
    { name: 'Usuários', description: 'Endpoints de gerenciamento de cidadãos.' },
    { name: 'Empresas', description: 'Endpoints de empresas parceiras.' },
    { name: 'Itens', description: 'Endpoints de gerenciamento do inventário de resíduos.' }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    schemas: {
      Login: loginSchema,
      Usuario: userSchema,
      Empresa: empresaSchema,
      ItemResiduo: itemSchema 
    }
  },
  paths: {
    ...authPaths,
    ...userPaths,
    ...empresaPaths,
    ...itemPaths
  }
};

export default swaggerSpec;