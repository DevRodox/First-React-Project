import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors, { CorsOptions } from 'cors';
import AuthenticationController from './controllers/AuthenticationController';
import ProductController from './controllers/ProductController';
import SalesController from './controllers/SalesController';
import UsuarioController from './controllers/UsuarioController';

const app: Application =  express();

const corsOption: CorsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};

app.use(cors(corsOption));
app.use(bodyParser.json());

AuthenticationController.mount(app);
ProductController.mount(app);
SalesController.mount(app);
UsuarioController.mount(app);

export default app;
