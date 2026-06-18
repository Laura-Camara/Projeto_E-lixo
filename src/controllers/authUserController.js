import { autenticarUser } from "../services/authUserService.js";

export const loginUser = async(req, res, next) => {
    try {
        const {login, senha} = req.body
        
        const token = await autenticarUser(login, senha)

        res.status(200).json({token: token});

    } catch (error) {
        next(error);
    }    
};