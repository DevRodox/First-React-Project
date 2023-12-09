import { Request, Response, Application } from 'express';
import HttpStatusCodes from 'http-status-codes';
import Usuario from '../models/entities/Usuario';
import Sesion from '../models/Sesion';
import BaseController from './BaseController';

interface RegistroRequestBody {
    nombreUsuario: string,
    nombreCompleto: string,
    correo: string,
    password: string,
    direccion: string,
    noTarjeta: number,
    expMes: number,
    expAno: number,
    cvv: number
}

interface LoginRequestBody {
    nombreUsuario: string;
    password: string;
}

export default class AuthenticationController extends BaseController {
    protected initializeRouter(): void {
        this.router.post('/registro', this.registro);
        this.router.post('/inicioSesion', this.inicioSesion);
    }

    private async registro(req: Request, res: Response): Promise<void> {
        try {
            const {
                nombreUsuario,
                nombreCompleto,
                correo,
                password,
                direccion,
                noTarjeta,
                expMes,
                expAno,
                cvv
            } = <RegistroRequestBody>req.body;

            if (!nombreUsuario || !nombreCompleto || !correo || !password  || !direccion || !noTarjeta || !expMes || !expAno || !cvv) {
                res.status(HttpStatusCodes.BAD_REQUEST).end();
                return;
            }
    
            const nuevoUsuario = await Usuario.registrar(nombreUsuario, nombreCompleto, correo, password, direccion, noTarjeta, expMes, expAno, cvv );
    
            const sesion= Sesion.crearParaUsuario(nuevoUsuario);

            res.status(HttpStatusCodes.OK).json(sesion);
        } catch (e) {
            if (e instanceof Error && e.message === 'ErrorNombreUsuarioDuplicado') {
                res.status(HttpStatusCodes.CONFLICT).json({ mensaje: 'Ya existe un usuario con el mismo nombre de usuario.' });
                return;
            }

            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    }

    private async inicioSesion(req: Request, res: Response): Promise<void> {
        try {
            const { nombreUsuario, password } = <LoginRequestBody>req.body;

            if (!nombreUsuario || !password) {
                res.status(HttpStatusCodes.BAD_REQUEST).end();
                return;
            }
        
            const usuario = await Usuario.buscarPorNombreUsuarioYPassword(nombreUsuario, password);
            
            const sesion= Sesion.crearParaUsuario(usuario);

            res.status(HttpStatusCodes.OK).json(sesion);
        } catch (e) {
            if (e instanceof Error && e.message === 'ErrorUsuarioNoEncontrado') {
                res.status(HttpStatusCodes.UNAUTHORIZED).end();
                return;
            }

            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    }

    public static mount(app: Application): AuthenticationController {
        return new AuthenticationController(app, '/auth');
    }
}
