import { Entity, PrimaryGeneratedColumn, Column, Repository, QueryFailedError, OneToOne, JoinColumn} from 'typeorm';
import DatabaseConnection from '../../database/DatabaseConnection';
import Usuario from './Usuario';

const newLocal = "nombreUsuario";
@Entity({name: 'ventas'})
export default class Venta{
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    public id: number;

    @Column({type: 'varchar', length: 60, nullable: false})
    public nombreProducto: string;

    @Column({type: 'int', nullable: false, unsigned: true})
    public cantidadProducto: number;

    @Column({type: 'double', nullable: false, unsigned: true})
    public precioProducto: number;
    
    @Column({type: 'double', nullable: false})
    public total: number;

    @Column({type: 'datetime', nullable: false})
    public fechaCompra: Date;

    @OneToOne(() => Usuario, (usuario: Usuario) => usuario.nombreUsuario, {eager: true})
    @JoinColumn({name: 'nombreUsuario'})
    usuario: Usuario['nombreUsuario'];

    private constructor(
        id: number | undefined,
        nombreProducto: string,
        cantidadProducto: number,
        precioProducto: number,
        total: number,
        fechaCompra: Date,
        nombreUsuario: Usuario["nombreUsuario"]
    ){
        this.id = <number>id;
        this.nombreProducto = nombreProducto;
        this.cantidadProducto = cantidadProducto;
        this.precioProducto = precioProducto;
        this.total = total;
        this.fechaCompra = fechaCompra;
        nombreUsuario = nombreUsuario;
    }

    public static async registrar(
       nombreProducto: string,
       cantidadProducto: number,
       precioProducto: number,
  
    ): Promise<Venta> {
        const repositorioVenta = await this.obtenerRepositorioVenta();

        const total = cantidadProducto*precioProducto;
        const fechaCompra = new Date();
        // @ts-ignore
        const nombreUsuario = Usuario["nombreUsuario"];

        const venta = new Venta(
            undefined,
            nombreProducto,
            cantidadProducto,
            precioProducto,
            total,
            fechaCompra,
            nombreUsuario
        );

        try {
            await repositorioVenta.save(venta);
        } catch (e) {
            if (e instanceof QueryFailedError && e.message.includes('ER_DUP_ENTRY')) {
                throw new Error('ErrorVentaDuplicada');
            }

            throw e;
        }

        return venta;
    }

    public async actualizar(
        nombreProducto: string,
        cantidadProducto: number,
        precioProducto: number,
     
    ): Promise<void> {
       
        this.nombreProducto = nombreProducto;
        this.cantidadProducto = cantidadProducto;
        this.precioProducto = precioProducto;
        this.total = cantidadProducto*precioProducto;
      
        const repositorioVentas = await Venta.obtenerRepositorioVenta();

        try {
            await repositorioVentas.save(this);
        } catch (e) {
            if (e instanceof QueryFailedError && e.message.includes('ER_DUP_ENTRY')) {
                throw new Error('ErrorVentaDuplicada');
            }

            throw e;
        }
    }

    public static async consultarTodos(): Promise<Venta[]> {
        const repositorioVentas = await Venta.obtenerRepositorioVenta();

        if (repositorioVentas == null)
        {
            throw new Error('ErrorRepositorioVacío');
        }

        return repositorioVentas.find();
    }

    public static async buscarPorId(id: number): Promise<Venta> {
        const repositorioVentas = await Venta.obtenerRepositorioVenta();

        const venta = await repositorioVentas.findOneBy({ id });

        if (!venta) {
            throw new Error('ErrorVentaNoEncontrada');
        }

        return venta;
    }

    public static async eliminar(id: number): Promise<void> {
        const repositorioVentas = await Venta.obtenerRepositorioVenta();
        const venta = await repositorioVentas.findOneBy({ id });

        await repositorioVentas.delete(id);

        if (!venta) {
            throw new Error('ErrorVentaNoEncontrada');
        }
    }

    private static async obtenerRepositorioVenta(): Promise<Repository<Venta>> {
        const databaseConnection = await DatabaseConnection.getConnectedInstance();
        return databaseConnection.getRepository(Venta);
    }
}