import { criarErro } from "./errorMiddleware.js";

export const checkRole = (...allowedRoles) => {
    return (req, res, next) => {
        const user = req.user;

        if(user && user.role === 'admin') {
            return next();
        };

        if(!user || !allowedRoles.includes(user.role)) {
            return next(criarErro("Acesso negado. Permissões insuficientes.", 403))

        }
        next();
    };
};