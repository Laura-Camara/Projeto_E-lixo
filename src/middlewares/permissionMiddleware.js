import { criarErro } from "./errorMiddleware.js";

export const checkRole = (requiredRole) => {
    return (req, res, next) => {
        const user = req.user;

        if(user && user.role === 'admin') {
            return next();
        };

        if(!user || user.role !== requiredRole) {
            return next(criarErro("Acesso negado. Permissões insuficientes.", 403))

        }
        next();
    };
};