import { Router } from "express";
import { loginEmpresa } from "../controllers/authEmpresaController.js";
import { verificarLogin } from "../validators/authValidator.js";

const router = Router()

router.post('/empresa', verificarLogin, loginEmpresa);

export default router;