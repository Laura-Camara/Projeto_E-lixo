import { version } from "mongoose";
import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info:{
            title: "PLATAFORMA DE INVENTÁRIO E DESCARTE DE E-LIXO",
            version: "1.0.0",
            description: "Documentação com Swagger"
        },
        servers: [
            {
                url: "http://localhost:3000/api/elixo",
                description: "Servidor local"
            }
        ] 
    },
    apis: [
        './src/routes/*.js',
        './src/docs/*.js'
    ],
};
const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec