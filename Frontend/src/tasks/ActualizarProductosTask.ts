import Producto from '../models/Producto';
import ProductosService from '../services/ProductosService';

export default class ActualizarProductosTask {
    private producto: Producto;

    public constructor(producto: Producto) {
        this.producto = producto;
    }

    public async execute(): Promise<void> {
        this.validar();
        await this.actualizarProducto();
    }

    private validar(): void {
        const { nombre: nombre, imagen: imagen, descripcion: descripcion, precio: precio, cantidad: cantidad } = this.producto;

        if (!nombre || !imagen || !descripcion || !precio ||!cantidad) {
            throw new Error('ErrorFormularioIncompleto');
        }
    }

    public async actualizarProducto(): Promise<void> {
        const servicioProductos = new ProductosService();
        await servicioProductos.actualizar(this.producto, this.producto.id);
    }
}