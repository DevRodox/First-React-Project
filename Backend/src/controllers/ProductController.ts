import { Application, Request, Response } from 'express';
import HttpStatusCodes from 'http-status-codes';
import Producto from '../models/entities/Producto';
import Sesion from '../models/Sesion';
import BaseController from './BaseController';

interface RegistrarActualizarRequestBody {
    nombre: string,
    imagen: string,
    descripcion: string,
    precio: number,
    cantidad: number
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
            const productos = await Producto.consultarTodos();
    
            res.status(HttpStatusCodes.OK).json(productos);
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

            const producto = await Producto.buscarPorId(id);

            res.status(HttpStatusCodes.OK).json(producto);
        } catch (e) {
            if (e instanceof Error && e.message === 'ErrorProductoNoEncontrado') {
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
                nombre,
                imagen,
                descripcion,
                precio,
                cantidad
            } = <RegistrarActualizarRequestBody>req.body;

            if (!nombre || !imagen || !descripcion || !precio || !cantidad) {
                res.status(HttpStatusCodes.BAD_REQUEST).end();
                return;
            }
    
            const nuevoProducto = await Producto.registrar(nombre, imagen, descripcion, precio, cantidad);
    
            res.status(HttpStatusCodes.OK).json(nuevoProducto);
        } catch (e) {
            if (e instanceof Error && e.message === 'ErrorProductoDuplicado') {
                res.status(HttpStatusCodes.CONFLICT).json({ mensaje: 'Ya existe ese producto.' });
                return;
            }

            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    }
    
    private async actualizar(req: Request, res: Response): Promise<void> {
        try {
            const {
                nombre,
                imagen,
                descripcion,
                precio,
                cantidad
            } = <RegistrarActualizarRequestBody>req.body;

            if (!nombre || !imagen || !descripcion || !precio || !cantidad) {
                res.status(HttpStatusCodes.BAD_REQUEST).end();
                return;
            }

            const id = parseInt(req.params.id);

            const producto = await Producto.buscarPorId(id);

            await producto.actualizar(nombre, imagen, descripcion, precio, cantidad);
    
            res.status(HttpStatusCodes.OK).json(producto);
        } catch (e) {
            if (e instanceof Error && e.message === 'ErrorProductoNoEncontrado') {
                res.status(HttpStatusCodes.NOT_FOUND).end();
                return;
            }

            if (e instanceof Error && e.message === 'ErrorProductoDuplicado') {
                res.status(HttpStatusCodes.CONFLICT).json({ mensaje: 'Ya existe ese producto.' });
                return;
            }

            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    }
    
    private async eliminar(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);

            const productos = await Producto.eliminar(id);
    
            res.status(HttpStatusCodes.OK).json(productos);
        } catch (e) {
            if (e instanceof Error && e.message === 'ErrorProductoNoEncontrado') {
                res.status(HttpStatusCodes.NOT_FOUND).end();
                return;
            }
            
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    }

    public static mount(app: Application): ProductController {
        return new ProductController(app, '/productos');
    }
}