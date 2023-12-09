import AuthenticationService from '../services/AuthenticationService';

interface DatosFormularioRegistroUsuario {
    nombreUsuario: string;
    nombreCompleto: string;
    correo: string;
    password: string;
    verificarPassword: string;
    direccion: string;
    noTarjeta: number;
    expMes: number;
    expAno: number;
    cvv: number;
}

export default class RegistrarUsuarioTask {
    private datosFormularioRegistroUsuario: DatosFormularioRegistroUsuario;

    public constructor(
        datosFormularioRegistroUsuario: DatosFormularioRegistroUsuario
    ) {
        this.datosFormularioRegistroUsuario =
            datosFormularioRegistroUsuario;
    }

    public async execute(): Promise<void> {
        this.validarDatosFormulario();
        const tokenSesion = await this.registrarUsuario();
        localStorage.setItem('tokenSesion', tokenSesion);
    }

    private async registrarUsuario(): Promise<string> {
        const servicioAutenticacion = new AuthenticationService();

        const {
            nombreUsuario,
            nombreCompleto,
            correo,
            password,
            direccion,
            noTarjeta,
            expMes,
            expAno,
            cvv
        } = this.datosFormularioRegistroUsuario;

        const tokenSesion = servicioAutenticacion.registrarUsuario({
            nombreUsuario,
            nombreCompleto,
            correo,
            password,
            direccion,
            noTarjeta,
            expMes,
            expAno,
            cvv
        });

        return tokenSesion;
    }

    private validarDatosFormulario(): void {
        const {
            nombreUsuario,
            nombreCompleto,
            correo,
            password,
            verificarPassword,
            direccion,
            noTarjeta,
            expMes,
            expAno,
            cvv,
        } = this.datosFormularioRegistroUsuario;

        if (
            !nombreUsuario
            ||!nombreCompleto
            ||!correo
            ||!password
            ||!verificarPassword
            ||!direccion
            ||!noTarjeta
            || noTarjeta === undefined
            ||!expMes
            || expMes === undefined
            ||!expAno
            ||!cvv
            || cvv === undefined
        ) {
            throw new Error('ErrorFormularioIncompleto');
        }

        if (password !== verificarPassword) {
            throw new Error('ErrorPasswordsNoCoinciden');
        }
    }
}
