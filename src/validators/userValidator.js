import { body } from "express-validator";
import { verificarErros } from "../middlewares/validatorMiddleware.js";

export const regrasCadastroUser = [
    body('nome')
        .trim()
        .notEmpty().withMessage('O nome é obrigatório.')
        .isLength({min: 3}).withMessage('O nome deve ter pelo menos 3 caracteres.'),

     body('telefone')
        .if(body('role').not().equals('admin'))
        .trim()
        .notEmpty().withMessage('O telefone é obrigatório.'),
    
    body('email')
        .notEmpty().withMessage('O e-mail é obrigatório.')
        .isEmail().withMessage('E-mail inválido.')
        .trim(),

    body('login').notEmpty().withMessage('O login é obrigatório.'),
        
    body('senha')
        .notEmpty().withMessage('A senha é obrigatória.')
        .isLength({min: 6}).withMessage('A senha deve ter pelo menos 6 caracteres.'),

    body('endereco')
        .if(body('role').not().equals('admin'))
        .notEmpty().withMessage('O endereço é obrigatório.'),

    body('endereco.rua')
        .if(body('role').not().equals('admin'))    
        .notEmpty().withMessage('A rua é obrigatória.'),

    body('endereco.numero')
        .if(body('role').not().equals('admin'))
        .notEmpty().withMessage('O número é obrigatório.'),

    body('endereco.bairro')
        .if(body('role').not().equals('admin'))
        .notEmpty().withMessage('O bairro é obrigatório.'),
    
    body('endereco.cidade')
        .if(body('role').not().equals('admin'))
        .notEmpty().withMessage('A cidade é obrigatória.'),

    body('endereco.cep')
        .if(body('role').not().equals('admin'))
        .notEmpty().withMessage('O CEP é obrigatório.'),

    body('endereco.uf')
        .if(body('role').not().equals('admin'))
        .notEmpty().withMessage('O estado é obrigatório.'),

    verificarErros
]
