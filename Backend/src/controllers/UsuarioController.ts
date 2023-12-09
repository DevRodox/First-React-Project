import { Application, Request, Response } from 'express';
import HttpStatusCodes from 'http-status-codes';
import Usuario from '../models/entities/Usuario';
import Sesion from '../models/Sesion';
import BaseController from './BaseController';

export default class UsuarioController extends BaseController {
    protected initializeRouter(): void {
        this.router.all('*', Sesion.verificarTokenSesion);
        this.router.get('/:id', this.buscarPorId);
    }

    private async buscarPorId(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);

            const usuario = await Usuario.buscarPorId(id);

            res.status(HttpStatusCodes.OK).json(usuario.nombreUsuario);
        } catch (e) {
            if (e instanceof Error && e.message === 'ErrorUsuarioNoEncontrado') {
                res.status(HttpStatusCodes.NOT_FOUND).end();
                return;
            }

            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    }
    
    public static mount(app: Application): UsuarioController {
        return new UsuarioController(app, '/usuarios');
    }
}