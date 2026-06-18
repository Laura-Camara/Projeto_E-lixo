import { Router } from 'express';
import empresaController from '../controllers/empresaController.js';
import userController from '../controllers/userController.js';

const viewRouter = Router(); 

viewRouter.get('/empresas/lista', empresaController.renderListaEmpresas);

viewRouter.get('/users/lista', userController.renderListaUsers);

export default viewRouter