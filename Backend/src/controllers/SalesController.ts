import { Application, Request, Response } from 'express';
import HttpStatusCodes from 'http-status-codes';
import Venta from '../models/entities/Venta';
import Sesion from '../models/Sesion';
import BaseController from './BaseController';

interface RegistrarActualizarRequestBody {
    nombreProducto: string,
    cantidadProducto: number,
    precioProducto: number,
}

export default class ProductController extends BaseController {
    protected initializeRouter(): void {
        this.router.all('*', Sesion.verificarTokenSesion);
        
        this.router.get('/', this.consultarTodos);
        this.router.get('/:id', this.buscarPorId);
        this.router.post('/', this.registrar);
        this.router.put('/:id', this.actualizar);
        this.router.delete('/:id', this.eliminar);
    }

    private async consultarTodos(req: Request, res: Response): Promise<void> {
        try {
            const ventas = await Venta.consultarTodos();
    
            res.status(HttpStatusCodes.OK).json(ventas);
        } catch (e) {
            if (e instanceof Error && e.message === 'ErrorRepositorioVacío') {
                res.status(HttpStatusCodes.NOT_FOUND).json('Repositorio vacío').end();
                return;
            }

            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    }

    private async buscarPorId(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);

            const venta = await Venta.buscarPorId(id);

            res.status(HttpStatusCodes.OK).json(venta);
        } catch (e) {
            if (e instanceof Error && e.message === 'ErrorVentaNoEncontrada') {
                res.status(HttpStatusCodes.NOT_FOUND).end();
                return;
            }

            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    }
    
    private async registrar(req: Request, res: Response): Promise<void> {
        try {
            const {
                nombreProducto,
                cantidadProducto,
                precioProducto
            } = <RegistrarActualizarRequestBody>req.body;

            if (!nombreProducto ||!cantidadProducto || !precioProducto) {
                res.status(HttpStatusCodes.BAD_REQUEST).end();
                return;
            }
    
            const nuevaVenta = await Venta.registrar(nombreProducto, cantidadProducto, precioProducto);
    
            res.status(HttpStatusCodes.OK).json(nuevaVenta);
        } catch (e) {
            if (e instanceof Error && e.message === 'ErrorVentaDuplicada') {
                res.status(HttpStatusCodes.CONFLICT).json({ mensaje: 'Ya existe un venta igual.' });
                return;
            }

            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    }
    
    private async actualizar(req: Request, res: Response): Promise<void> {
        try {
            const {
                nombreProducto,
                cantidadProducto,
                precioProducto
            } = <RegistrarActualizarRequestBody>req.body;

            if (!nombreProducto ||!cantidadProducto || !precioProducto) {
                res.status(HttpStatusCodes.BAD_REQUEST).end();
                return;
            }

            const id = parseInt(req.params.id);

            const ventas = await Venta.buscarPorId(id);

            await ventas.actualizar(nombreProducto, cantidadProducto, precioProducto);
    
            res.status(HttpStatusCodes.OK).json(ventas);
        } catch (e) {
            if (e instanceof Error && e.message === 'ErrorVentaNoEncontrada') {
                res.status(HttpStatusCodes.NOT_FOUND).end();
                return;
            }

            if (e instanceof Error && e.message === 'ErrorVentaDuplicada') {
                res.status(HttpStatusCodes.CONFLICT).json({ mensaje: 'Ya existe una venta igual.' });
                return;
            }

            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    }
    
    private async eliminar(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);

            const ventas = await Venta.eliminar(id);
    
            res.status(HttpStatusCodes.OK).json(ventas);
        } catch (e) {
            if (e instanceof Error && e.message === 'ErrorVentaNoEncontrada') {
                res.status(HttpStatusCodes.NOT_FOUND).end();
                return;
            }

            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    }

    public static mount(app: Application): ProductController {
        return new ProductController(app, '/ventas');
    }
}