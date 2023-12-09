export default class Producto {
    public id: number;

    public nombre: string;

    public imagen: string;

    public descripcion: string;

    public precio: number;

    public cantidad: number;

    public constructor(
        id: number | undefined,
        nombre: string,
        imagen: string,
        descripcion: string,
        precio: number,
        cantidad: number,
    
    ) {
        this.id = id as number;
        this.nombre = nombre;
        this.imagen = imagen;
        this.descripcion = descripcion;
        this.precio = precio;
        this.cantidad = cantidad;
    }
}
