import jwt from 'jsonwebtoken';
import empresaRepository from '../repositories/empresaRepository.js';
import { criarErro } from "../middlewares/errorMiddleware.js";

const JWT_SECRET = 'sua-chave-super-secreta-e-longa-12345';

export const autenticarEmpresa = async (login, senha) => {
    const empresa = await empresaRepository.findByLogin(login)
    
    if (!empresa) {
        throw criarErro("Credencias inválidas", 401);
    } 

    const senhaValida = await bcrypt.compare(senha, empresa.senha)
    if(!senhaValida) { 
        throw criarErro("Credencias inválidas", 401);
     }

    const payload = {
        empresaId: empresa.id,
        login: empresa.login,
        role: empresa.role
    };

    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: '1h'});

    return token;
};
