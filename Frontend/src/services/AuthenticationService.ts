import axios, { AxiosError } from 'axios';

interface DatosRegistroUsuario {
    nombreUsuario: string;
    nombreCompleto: string;
    correo: string;
    password: string;
    direccion: string;
    noTarjeta: number;
    expMes: number;
    expAno: number;
    cvv: number;
}

interface DatosInicioSesion {
    nombreUsuario: string;
    password: string;
}

export default class AuthenticationService {
    private baseUrl: string;

    public constructor() {
        this.baseUrl = 'http://localhost:3001/auth';
    }

    public async registrarUsuario(
        datosRegistro: DatosRegistroUsuario
    ): Promise<string> {
        try {
            const respuesta = await axios.post(
                `${this.baseUrl}/registro`,
                datosRegistro
            );
            return respuesta.data.tokenSesion as string;
        } catch (e) {
            if (e instanceof AxiosError) {
                switch (e.response?.status) {
                    case 400:
                        throw new Error('ErrorFormularioIncompleto');
                    case 409:
                        throw new Error('ErrorNombreUsuarioDuplicado');
                    default:
                        throw new Error('ErrorDesconocido');
                }
            } else {
                throw e;
            }
        }
    }

    public async iniciarSesion(
        datosInicioSesion: DatosInicioSesion
    ): Promise<string> {
        try {
            const respuesta = await axios.post(
                `${this.baseUrl}/inicioSesion`,
                datosInicioSesion
            );
            return respuesta.data.tokenSesion as string;
        } catch (e) {
            if (e instanceof AxiosError) {
                switch (e.response?.status) {
                    case 400:
                        throw new Error('ErrorFormularioIncompleto');
                    case 401:
                        throw new Error('ErrorNombreUsuarioPasswordIncorrectos');
                    default:
                        throw new Error('ErrorDesconocido');
                }
            } else {
                throw e;
            }
        }
    }
}
