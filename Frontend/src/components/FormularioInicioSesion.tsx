import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, FloatingLabel, Form} from 'react-bootstrap';
import { toast } from 'react-toastify';
import IniciarSesionTask from '../tasks/IniciarSesionTask';
import './routes/scss/Espacios.scss';
import './scss/Focus.scss';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function FormularioInicioSesion() {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const [isHovering, setIsHovering] = useState(false);

    const handleMouseEnter = () => {
    setIsHovering(true);
    };

    const handleMouseLeave = () => {
    setIsHovering(false);
    };


    async function handleFormSubmit(event: FormEvent) {
        event.preventDefault();
        
        try {
            const iniciarSesionTask = new IniciarSesionTask({
                nombreUsuario,
                password
            });

            await iniciarSesionTask.execute();

            navigate('/productos');
        } catch (e) {
            switch ((e as Error).message) {
                case 'ErrorFormularioIncompleto':
                    toast(
                        'Olvidaste completar todos los campos del formulario.',
                        { type: 'warning' }
                    );
                    break;
                case 'ErrorNombreUsuarioPasswordIncorrectos':
                    toast(
                        'Error de usuario o contraseña.',
                        { type: 'error' }
                    );
                    break;
                default:
                    toast(
                        'Ha ocurrido un error desconocido.',
                        { type: 'error' }
                    );
            }
        }
    }

    function handleNombreUsuarioChange(
        event: ChangeEvent<HTMLInputElement>
    ) {
        const valueNombreUsuario = event.target.value;
        setNombreUsuario(valueNombreUsuario);
    }

    function handlePasswordChange(
        event: ChangeEvent<HTMLInputElement>
    ) {
        const valuePassword = event.target.value;
        setPassword(valuePassword);
    }

    return (
        <Form onSubmit={handleFormSubmit}>
            <Form.Group>
                <FloatingLabel label="Nombre de usuario">
                        <Form.Control
                            required
                            type="text"
                            maxLength={20}
                            id="txtUsuario"
                            name="nombreUsuario"
                            placeholder='Usuario'
                            value={nombreUsuario}
                            onChange={handleNombreUsuarioChange}
                        />
                </FloatingLabel>
            </Form.Group>
            <br></br>
            <Form.Group>
                <FloatingLabel label="Contraseña">
                    <Form.Control
                        required
                        type="password"
                        minLength={8}
                        maxLength={32}
                        id="txtPassword"
                        name="password"
                        placeholder='Contraseña'
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </FloatingLabel>
            </Form.Group>
            <Button className='btn shadow ' type="submit" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{ background: 'linear-gradient(to right, rgba(102, 126, 234, 0.5), rgba(118, 75, 162, 0.5))', border:'none', color: isHovering ? 'white' : 'black'}}>
                <FontAwesomeIcon icon={faCheck} />&nbsp;
                Iniciar sesión
            </Button>      
        </Form>
    );
}
