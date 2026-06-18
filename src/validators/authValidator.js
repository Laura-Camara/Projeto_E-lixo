import { body } from "express-validator";
import { verificarErros } from "../middlewares/validatorMiddleware.js";

export const verificarLogin = [
    body('login').notEmpty().withMessage('O login é obrigatório.'),

    body('senha').notEmpty().withMessage('A senha é obrigatória.'),

    verificarErros
]