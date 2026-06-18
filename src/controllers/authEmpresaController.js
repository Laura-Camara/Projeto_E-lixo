import { autenticarEmpresa } from "../services/authEmpresaService.js";

export const loginEmpresa = async(req, res, next) => {
    try {
        const {login, senha} = req.body
        
        const token = await autenticarEmpresa(login, senha);

        res.status(200).json({token: token});

    } catch (error) {
        next(error);
    }    
};