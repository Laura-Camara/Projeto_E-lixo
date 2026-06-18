import jwt from 'jsonwebtoken';
import { criarErro } from './errorMiddleware.js';

const JWT_SECRET = process.env.JWT_SECRET;

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return next(criarErro("Acesso negado. Token não fornecido.", 401));
    }

    const parts = authHeader.split(' ')

    if(parts.length !== 2) {
        return next(criarErro("Erro no formato do Token.", 401));
    }

    const [scheme, token] = parts;
    if(!/^Bearer$/i.test(scheme)) {
        return next(criarErro("Token mal formatado.", 401))
    } 

    try {
        const payloadDecodificado = jwt.verify(token, JWT_SECRET);
        req.user = payloadDecodificado;

        next();
        
    } catch (error) {
        return next(criarErro("Token inválido ou expirado.", 403))
    }
};