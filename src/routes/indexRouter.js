import { Router } from 'express';
import userRouter from './userRouter.js';
import empresaRouter from './empresaRouter.js';
import itemRouter from './itemRouter.js'

const mainRouter = Router();

mainRouter.use('/users/itens', itemRouter)

mainRouter.use('/users', userRouter);

mainRouter.use('/empresas', empresaRouter);

export default mainRouter;