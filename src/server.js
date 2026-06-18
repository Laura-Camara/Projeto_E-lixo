import dotenv from 'dotenv';

dotenv.config();

import app from './app.js';
import db from './data/database.js';
import connectDB from './config/database.js';

const PORT = process.env.PORT || 3000;

const inicializarServidor = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`)
            console.log(`API de E-Lixo disponível em http://localhost:${PORT}/api/elixo`)
        });

    } catch (error) {
        console.error("Falha ao iniciar o sistema:", error.message);
        process.exit(1);
    }
}

inicializarServidor();
