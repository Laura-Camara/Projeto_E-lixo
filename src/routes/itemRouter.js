import itemController from "../controllers/itemController.js";
import { Router } from "express";
import { regrasCadastroItem } from "../validators/itemValidator.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { checkRole } from "../middlewares/permissionMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.get('/inventario', checkRole('user'), itemController.listarItensDoUsuarioLogado);
router.get('/', checkRole('admin', 'empresa'), itemController.listarTodosOsItens);
router.post('/', checkRole('admin', 'user'), regrasCadastroItem, itemController.criarItem);

router.get('/:id', checkRole('admin', 'user', 'empresa'), itemController.buscarItemPorId);
router.put('/:id', checkRole('admin', 'user'), regrasCadastroItem, itemController.atualizarItem)
router.delete('/:id', checkRole('admin', 'user'), itemController.deleteItem);

router.patch('/:id/coletar', checkRole('empresa'), itemController.marcarComoColetado);

export default router;