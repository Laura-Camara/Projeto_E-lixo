import { Router } from "express";
import { loginUser } from "../controllers/authUserController.js";
import { verificarLogin } from "../validators/authValidator.js";

const router = Router()

router.post('/user', verificarLogin, loginUser);

export default router;