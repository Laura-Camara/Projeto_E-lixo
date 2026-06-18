import itemController from "../controllers/itemController.js";
import { Router } from "express";
import { regrasCadastroItem } from "../validators/itemValidator.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { checkRole } from "../middlewares/permissionMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.get('/inventario', itemController.listarItensDoUsuarioLogado);
router.get('/', checkRole('admin'), itemController.listarTodosOsItens);
router.post('/', regrasCadastroItem, itemController.criarItem);

router.get('/:id', itemController.buscarItemPorId);
router.put('/:id', regrasCadastroItem, itemController.atualizarItem)
router.delete('/:id', itemController.deleteItem);

router.patch('/:id/coletar', itemController.marcarComoColetado);

export default router;