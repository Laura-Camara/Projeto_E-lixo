import { body } from "express-validator";
import { verificarErros } from "../middlewares/validatorMiddleware.js";

export const regrasCadastroEmpresa = [
    body('razaoSocial')
        .trim()
        .notEmpty().withMessage('A razão social é obrigatória.'),

    body('telefone')
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

    body('cnpj')
        .trim()
        .notEmpty().withMessage('O CNPJ é obrigatório.')
        .matches(/^\d{14}$|^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/)
        .withMessage('Formato de CNPJ inválido. Envie apenas os 14 números ou no formato XX.XXX.XXX/XXXX-XX.'),

    body('endereco')
        .notEmpty().withMessage('O endereço é obrigatório.'),

    body('endereco.rua').notEmpty().withMessage('A rua é obrigatória.'),

    body('endereco.numero').notEmpty().withMessage('O número é obrigatório.'),

    body('endereco.bairro').notEmpty().withMessage('O bairro é obrigatório.'),
    
    body('endereco.cidade').notEmpty().withMessage('A cidade é obrigatória.'),

    body('endereco.cep').notEmpty().withMessage('O CEP é obrigatório.'),

    body('endereco.uf').notEmpty().withMessage('O estado é obrigatório.'),

    body('localizacao')
    .notEmpty().withMessage('A localização geográfica da empresa é obrigatória.'),

    body('localizacao.lat')
        .notEmpty().withMessage('A latitude da empresa é obrigatória.')
        .isNumeric().withMessage('A latitude deve ser um número.'),

    body('localizacao.lng')
        .notEmpty().withMessage('A longitude da empresa é obrigatória.')
        .isNumeric().withMessage('A longitude deve ser um número.'),
        
    verificarErros
]