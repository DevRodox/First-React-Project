import axios, { AxiosError } from 'axios';
import Producto from '../models/Producto';

interface ProductoConFormatoDelBackend {
        id: number,
        nombre: string,
        imagen: string,
        descripcion: string,
        precio: number,
        cantidad: number,
}

export default class ProductosService {
    private tokenSesion: string;

    private baseUrl: string;

    public constructor() {
        const tokenSesion = localStorage.getItem('tokenSesion');
        if (!tokenSesion) {
            throw new Error('ErrorSesionExpiradaOInvalida');
        }
        this.tokenSesion = tokenSesion;
        this.baseUrl = 'http://localhost:3001/productos';
    }

    private get headers() {
        return {
            'Token-Sesion': this.tokenSesion
        };
    }

    public async obtenerLista(): Promise<Producto[]> {
        try {
            const respuesta = await axios.get(
                this.baseUrl,
                { headers: this.headers }
            );

            const listaProductos = respuesta.data.map(
                (producto: ProductoConFormatoDelBackend) => (
                    new Producto(
                        producto.id,
                        producto.nombre,
                        producto.imagen,
                        producto.descripcion,
                        producto.precio,
                        producto.cantidad
                    )
                )
            );

            return listaProductos;
        } catch (e) {
            if (e instanceof AxiosError && e.response) {
                switch (e.response.status) {
                    case 401:
                        throw new Error('ErrorSesionExpiradaOInvalida');
                    default:
                        throw e;
                }
            }

            throw e;
        }
    }

    public async obtenerPorId(id: number): Promise<Producto> {
        try {
            const respuesta = await axios.get(
                `${this.baseUrl}/${id}`,
                { headers: this.headers }
            );
    
            const {
                nombre,
                imagen,
                descripcion,
                precio,
                cantidad
            } = respuesta.data as ProductoConFormatoDelBackend;
    
            return new Producto(
                id,
                nombre,
                imagen,
                descripcion,
                precio,
                cantidad
            );
        } catch (e) {
            if (e instanceof AxiosError && e.response) {
                switch (e.response.status) {
                    case 401:
                        throw new Error('ErrorSesionExpiradaOInvalida');
                    case 404:
                        throw new Error('ErrorProductoNoEncontrado');
                    default:
                        throw e;
                }
            }

            throw e;
        }
    }

    public async registrar(producto: Producto): Promise<Producto> {
        try {
            const respuesta = await axios.post(
                this.baseUrl,
                producto,
                { headers: this.headers }
            );

            const {
                id,
                nombre,
                imagen,
                descripcion,
                precio,
                cantidad
            } = respuesta.data as ProductoConFormatoDelBackend;

            return new Producto(
                id,
                nombre,
                imagen,
                descripcion,
                precio,
                cantidad
            );
        } catch (e) {
            if (e instanceof AxiosError && e.response) {
                switch (e.response.status) {
                    case 400: // Bad Request
                        throw new Error('ErrorFormularioIncompleto');
                    case 401: // Unauthorized
                        throw new Error('ErrorSesionExpiradaOInvalida');
                    case 409: // Conflict
                        throw new Error('ErrorProductoDuplicado');
                    default:
                        throw e;
                }
            }

            throw e;
        }
    }

    public async actualizar(producto: Producto, id: number): Promise<Producto> {
        try {
            const respuesta = await axios.put(
                `${this.baseUrl}/${id}`,
                producto,
                { headers: this.headers }
            );

            const {
                nombre,
                imagen,
                descripcion,
                precio,
                cantidad
            } = respuesta.data as ProductoConFormatoDelBackend;

            return new Producto(
                id,
                nombre,
                imagen,
                descripcion,
                precio,
                cantidad
            )
        } catch (e) {
            if (e instanceof AxiosError && e.response) {
                switch (e.response.status) {
                    case 400: // Bad Request
                        throw new Error('ErrorFormularioIncompleto');
                    case 401: // Unauthorized
                        throw new Error('ErrorSesionExpiradaOInvalida');
                    case 404: //Not Found
                        throw new Error('ErrorProductoNoEncontrado');
                    case 409: // Conflict
                        throw new Error('ErrorProductoDuplicado');
                    default:
                        throw e;
                }
            }

            throw e;
        }
    }

    public async eliminar(producto:Producto): Promise<void> {
        try {
            const respuesta = await axios.delete(
                `${this.baseUrl}/${producto.id}`,
                { headers: this.headers }
            );
        } catch (e) {
            if (e instanceof AxiosError && e.response) {
                switch (e.response.status) {
                    case 401:
                        throw new Error('ErrorSesionExpiradaOInvalida');
                    case 404:
                        throw new Error('ErrorProductoNoEncontrado');
                    default:
                        throw e;
                }
            }

            throw e;
        }
    }
}
