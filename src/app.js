import express from 'express';
import mainRouter from './routes/indexRouter.js';
import {rotaNaoEncontrada, globalErrorHandle } from './middlewares/errorMiddleware.js';
import path, { dirname } from 'path'
import { fileURLToPath } from 'url';
import viewRouter from './routes/viewRouter.js';
import routerAuthUser from './routes/authUserRouter.js';
import routerAuthEmpresa from './routes/authEmpresaRouter.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../swagger.js';
import cors from 'cors';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({
    origin: ['http://localhost:8080', 'http://127.0.0.1:8080']
}));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, '../public')))
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/', viewRouter);
app.use('/api/elixo/auth', routerAuthUser);
app.use('/api/elixo/auth', routerAuthEmpresa);
app.use('/api/elixo', mainRouter);



app.use(rotaNaoEncontrada);

app.use(globalErrorHandle);

export default app