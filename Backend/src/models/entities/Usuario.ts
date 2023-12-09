import { Entity, PrimaryGeneratedColumn, Column, Repository, QueryFailedError, OneToOne, JoinColumn} from 'typeorm';
import DatabaseConnection from '../../database/DatabaseConnection';
import Venta from './Venta';

@Entity({ name: 'usuarios' })
export default class Usuario {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    public id: number;

    @Column({ type: 'varchar', length: 20, nullable: false, unique: true })
    public nombreUsuario: string;

    @Column({ type: 'varchar', length: 60, nullable: false, unique: true })
    public nombreCompleto: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    public correo: string;

    @Column({ type: 'varchar', length: 32, nullable: false })
    public password: string;

    @Column({type: 'varchar', length: 32, nullable: false})
    public direccion: string;
    
    @Column({type: 'bigint', nullable: false, unique: true, unsigned: true})
    public noTarjeta: number;

    @Column({ type: 'int', nullable: false, unsigned: true})
    public expMes: number;

    @Column({type: 'int', nullable: false, unsigned: true})
    public expAno: number;

    @Column({type: 'int', nullable: false, unsigned: true})
    public cvv: number;

    @Column({ type: 'datetime', nullable: false })
    public fechaCreacion: Date;

    @Column({ type: 'datetime', nullable: false })
    public fechaActualizacion: Date;

    @OneToOne(() => Venta, venta => venta.usuario, {
        cascade: true
    })
    @JoinColumn()
    usuario: Usuario["nombreUsuario"];

    private constructor(
        id: number | undefined,
        nombreUsuario: string,
        nombreCompleto: string,
        correo: string,
        password: string,
        direccion: string,
        noTarjeta: number,
        expMes: number,
        expAno: number,
        cvv: number,
        fechaCreacion: Date,
        fechaActualizacion: Date
    ) {
        this.id = <number>id;
        this.nombreUsuario = nombreUsuario;
        this.nombreCompleto = nombreCompleto;
        this.correo = correo;
        this.password = password;
        this.direccion = direccion;
        this.noTarjeta = noTarjeta;
        this.expMes = expMes;
        this.expAno = expAno;
        this.cvv = cvv;
        this.fechaCreacion = fechaCreacion;
        this.fechaActualizacion = fechaActualizacion;
    }

    public static async registrar(
        nombreUsuario: string,
        nombreCompleto: string,
        correo: string,
        password: string,
        direccion: string,
        noTarjeta: number,
        expMes: number,
        expAno: number,
        cvv: number
    ): Promise<Usuario> {
        const repositorioUsuarios = await this.obtenerRepositorioUsuarios();

        const fechaCreacion = new Date();

        const usuario = new Usuario(
            undefined,
            nombreUsuario,
            nombreCompleto,
            correo,
            password,
            direccion,
            noTarjeta,
            expMes,
            expAno,
            cvv,
            fechaCreacion,
            fechaCreacion
        );

        try {
            await repositorioUsuarios.save(usuario);
        } catch (e) {
            if (e instanceof QueryFailedError && e.message.includes('ER_DUP_ENTRY')) {
                throw new Error('ErrorNombreUsuarioDuplicado');
            }

            throw e;
        }

        return usuario;
    }

    public static async buscarPorNombreUsuarioYPassword(
        nombreUsuario: string,
        password: string
    ): Promise<Usuario> {
        const repositorioUsuarios = await this.obtenerRepositorioUsuarios();

        const usuario = await repositorioUsuarios.findOneBy({ nombreUsuario, password });

        if (!usuario) {
            throw new Error('ErrorUsuarioNoEncontrado');
        }

        return usuario;
    }

    public static async buscarPorId(id: number): Promise<Usuario> {
        const repositorioUsuarios = await this.obtenerRepositorioUsuarios();

        const usuario = await repositorioUsuarios.findOneBy({ id });

        if (!usuario) {
            throw new Error('ErrorUsuarioNoEncontrado');
        }

        return usuario;
    }

    private static async obtenerRepositorioUsuarios(): Promise<Repository<Usuario>> {
        const databaseConnection = await DatabaseConnection.getConnectedInstance();
        return databaseConnection.getRepository(Usuario);
    }
}
