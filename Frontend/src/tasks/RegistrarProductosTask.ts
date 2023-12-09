import Producto from '../models/Producto';
import ProductosService from '../services/ProductosService';

export default class RegistrarProductosTask {
    private producto: Producto;

    public constructor(producto: Producto) {
        this.producto = producto;
    }

    public async execute(): Promise<void> {
        this.validar();
        await this.registrarProducto();
    }

    private validar(): void {
        const { nombre: nombre, imagen: imagen, descripcion: descripcion, precio: precio, cantidad: cantidad } = this.producto;

        if (!nombre || !imagen || !descripcion || !precio ||!cantidad) {
            throw new Error('ErrorFormularioIncompleto');
        }
    }

    public async registrarProducto(): Promise<void> {
        const servicioProductos = new ProductosService();
        await servicioProductos.registrar(this.producto);
    }
}
