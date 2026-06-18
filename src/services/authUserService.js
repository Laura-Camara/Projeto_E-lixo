import jwt from 'jsonwebtoken';
import userRepository from '../repositories/userRepository.js';
import { criarErro } from "../middlewares/errorMiddleware.js";
import bcrypt from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET;

export const autenticarUser = async (login, senha) => {
    const user = await userRepository.findByLogin(login)
    
    if (!user) {
        throw criarErro("Credencias inválidas", 401);
    };
    
    const senhaValida = await bcrypt.compare(senha, user.senha)
    if(!senhaValida) { 
        throw criarErro("Credencias inválidas", 401);
    }

    const payload = {
        userId: user.id,
        login: user.login,
        role: user.role
    };

    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: '1h'});

    return token;
};
