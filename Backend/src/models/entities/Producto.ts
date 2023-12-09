import { Entity, PrimaryGeneratedColumn, Column, Repository, QueryFailedError } from 'typeorm';
import DatabaseConnection from '../../database/DatabaseConnection';

@Entity({name: 'productos'})
export default class Producto{
    @PrimaryGeneratedColumn({type: 'int', unsigned: true})
    public id: number;

    @Column({type:'varchar', length: 20, nullable: false, unique: true})
    public nombre: string;

    @Column({type:'varchar', length: 1000, nullable: false})
    public imagen: string;

    @Column({type:'varchar', length: 20, nullable: false})
    public descripcion: string;

    @Column({type:'double', nullable: false, unsigned: true})
    public precio: number;

    @Column({type:'int', nullable: false, unsigned: true})
    public cantidad: number;

    private constructor(
        id: number | undefined,
        nombre: string,
        imagen: string,
        descripcion: string,
        precio: number,
        cantidad: number,
    ){
        this.id = <number>id;
        this.nombre = nombre;
        this.imagen = imagen;
        this.descripcion = descripcion;
        this.precio = precio;
        this.cantidad = cantidad;
    }

    public async actualizar(
        nombre: string,
        imagen: string,
        descripcion: string,
        precio: number,
        cantidad: number
    ): Promise<void> {
        this.nombre = nombre;
        this.imagen = imagen;
        this.descripcion = descripcion;
        this.precio = precio;
        this.cantidad = cantidad;

        const repositorioProductos = await Producto.obtenerRepositorioProductos();

        try {
            await repositorioProductos.save(this);
        } catch (e) {
            if (e instanceof QueryFailedError && e.message.includes('ER_DUP_ENTRY')) {
                throw new Error('ErrorProductoDuplicado');
            }

            throw e;
        }
    }

    public static async consultarTodos(): Promise<Producto[]> {
        const repositorioProductos = await Producto.obtenerRepositorioProductos();

        if (repositorioProductos == null)
        {
            throw new Error('ErrorRepositorioVacío');
        }

        return repositorioProductos.find();
    }

    public static async buscarPorId(id: number): Promise<Producto> {
        const repositorioProductos = await Producto.obtenerRepositorioProductos();

        const producto = await repositorioProductos.findOneBy({ id });

        if (!producto) {
            throw new Error('ErrorProductoNoEncontrado');
        }

        return producto;
    }

    public static async registrar(
        nombre: string,
        imagen: string,
        descripcion: string,
        precio: number,
        cantidad: number
    ): Promise<Producto> {
        const repositorioProductos = await Producto.obtenerRepositorioProductos();

        const producto = new Producto(
            undefined,
            nombre,
            imagen,
            descripcion,
            precio,
            cantidad
        );

        try {
            await repositorioProductos.save(producto);
        } catch (e) {
            if (e instanceof QueryFailedError && e.message.includes('ER_DUP_ENTRY')) {
                throw new Error('ErrorProductoDuplicado');
            }

            throw e;
        }

        return producto;
    }

    public static async eliminar(id: number): Promise<void> {
        const repositorioProductos = await Producto.obtenerRepositorioProductos();
        const producto = await repositorioProductos.findOneBy({ id });

        await repositorioProductos.delete(id);

        if (!producto) {
            throw new Error('ErrorProductoNoEncontrado');
        }
    }

    private static async obtenerRepositorioProductos(): Promise<Repository<Producto>> {
        const databaseConnection = await DatabaseConnection.getConnectedInstance();
        return databaseConnection.getRepository(Producto);
    }
}
