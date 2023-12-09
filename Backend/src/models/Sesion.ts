import jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';
import HttpStatusCodes from 'http-status-codes';
import Usuario from './entities/Usuario';

export default class Sesion{
    public tokenSesion: string;

    private static readonly secret = 'manzana';

    private constructor(tokenSesion: string){
        this.tokenSesion = tokenSesion;
    }    

    public static crearParaUsuario(usuario: Usuario): Sesion{
        const data = {
            idUsuario: usuario.id,
            nombreUsuario: usuario.nombreUsuario,
            correo: usuario.correo,
        };
        const tokenSesion = jwt.sign(
            {data},
            Sesion.secret,
            {expiresIn: '1d'}
        );

        return new Sesion(tokenSesion);
    }

    public static verificarTokenSesion(
        req: Request,
        res: Response,
        next: NextFunction
    ): void{
        try{
        
            const tokenSesion = <string>req.headers['Token-Sesion'.toLowerCase()];
        
            if(!tokenSesion){
                res.status(HttpStatusCodes.UNAUTHORIZED).json({
                    mensaje: 'No se envió token de sesión.'
                });
                return;
            }
 
            jwt.verify(tokenSesion, Sesion.secret);

            next();
        }catch(e){
            console.error(e);
          
            res.status(HttpStatusCodes.UNAUTHORIZED).json({
                mensaje: 'Token de sesión es inválido o ha expirado.'
            });
        }
    }
}