import { body } from "express-validator";
import {verificarErros} from '../middlewares/validatorMiddleware.js';

export const regrasCadastroItem = [
    body('tipo')
        .trim()
        .notEmpty().withMessage('O tipo do resíduo/item é obrigatório.'),

    body('marca')
        .trim()
        .notEmpty().withMessage('A marca ou fabricante é obrigatória.'),

    body('descricao')
        .trim()
        .notEmpty().withMessage('Uma breve descrição sobre o estado do item é obrigatória.')
        .isLength({max: 500}).withMessage('A descrição não pode passar de 500 caracteres.'),

    body('condicao')
        .trim()
        .notEmpty().withMessage('A condição do item deve ser informada.')
        .toLowerCase()
        .isIn(['funcional', 'defeituoso', 'sucata'])
        .withMessage('Condição inválida. Use: funcional, defeituoso ou sucata.'),

    body('quantidade')
        .isInt({ min: 1 })
        .withMessage('A quantidade deve ser um número inteiro maior ou igual a 1.'),

    body('localizacao')
    .notEmpty().withMessage('O local de coleta no mapa é obrigatório.'),

    body('localizacao.lat')
        .notEmpty().withMessage('A latitude do local de coleta é obrigatória.')
        .isNumeric().withMessage('A latitude deve ser um número.'),

    body('localizacao.lng')
        .notEmpty().withMessage('A longitude do local de coleta é obrigatória.')
        .isNumeric().withMessage('A longitude deve ser um número.'),

    verificarErros
]