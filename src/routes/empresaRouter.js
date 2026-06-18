import { Router } from "express";
import empresaController from "../controllers/empresaController.js";
import { regrasCadastroEmpresa } from "../validators/empresaValidator.js";
import { checkRole } from '../middlewares/permissionMiddleware.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router()

//ROTA PÚBLICA
router.post('/', regrasCadastroEmpresa, empresaController.criarEmpresa)

//ROTAS PROTEGIDAS
router.get('/', authMiddleware, checkRole('admin'), empresaController.listarEmpresas)
router.get('/:id', authMiddleware, checkRole('admin', 'empresa'), empresaController.buscarEmpresaPorId)
router.patch('/:id', authMiddleware, checkRole('admin', 'empresa'), empresaController.atualizarPatchEmpresa)
router.delete('/:id', authMiddleware, checkRole('empresa'), empresaController.deleteEmpresa)

export default router;