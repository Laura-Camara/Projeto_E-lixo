import { Router } from "express";
import userController from "../controllers/userController.js";
import { regrasCadastroUser } from "../validators/userValidator.js";
import { checkRole } from '../middlewares/permissionMiddleware.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router()

//ROTA PÚBLICA
router.post('/', regrasCadastroUser, userController.criarUser)

//ROTAS PROTEGIDAS
router.get('/', authMiddleware, checkRole('admin'), userController.listarUsers)
router.get('/:id', authMiddleware, checkRole('admin', 'user'), userController.buscarUserPorId)
router.patch('/:id', authMiddleware, checkRole('admin', 'user'), userController.atualizarPatchUser)
router.delete('/:id', authMiddleware, checkRole('user'), userController.deleteUser)

export default router;