import { FormEvent, ChangeEvent, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import RegistrarUsuarioTask from '../tasks/RegistrarUsuarioTask';
import './routes/scss/Espacios.scss';
import './scss/Focus.scss';
import './scss/SpinNumber.scss';
import './scss/Payment.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-regular-svg-icons';

export default function FormularioRegistro() {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [nombreCompleto, setNombreCompleto] = useState('');
    const [password, setPassword] = useState('');
    const [verificarPassword, setVerificarPassword] = useState('');
    const [correo, setCorreo] = useState('');
    const [direccion, setDireccion] = useState('');
    const [noTarjeta, setNoTarjeta] = useState(0);
    const [expMes, setExpMes] = useState(0);
    const [expAno, setExpAno] = useState(0);
    const [cvv, setCvv] = useState(0);
    const navigate = useNavigate();

    const [isHovering, setIsHovering] = useState(false);

    const handleMouseEnter = () => {
    setIsHovering(true);
    };

    const handleMouseLeave = () => {
    setIsHovering(false);
    };

    const handleMouseEnterCard = () => {
        const flipFront = document.querySelector('.front') as HTMLElement;
        flipFront.style.transform = 'perspective(1000px) rotateY(-180deg)';

        const showBack = document.querySelector('.back') as HTMLElement;
        showBack.style.transform = 'perspective(1000px) rotateY(0deg)';
    };

    const handleMouseLeaveCard = () =>{
        const showFront = document.querySelector('.front') as HTMLElement;
        showFront.style.transform = 'perspective(1000px) rotateY(0deg)';
        
        const flipBack = document.querySelector('.back') as HTMLElement;
        flipBack.style.transform = 'perspective(1000px) rotateY(180deg)';
    }

    async function handleFormSubmit(event: FormEvent) {
        event.preventDefault();

        try {
            const registrarUsuarioTask = new RegistrarUsuarioTask({
                nombreUsuario,
                nombreCompleto,
                correo,
                password,
                verificarPassword,
                direccion,
                noTarjeta,
                expMes,
                expAno,
                cvv
            });

            await registrarUsuarioTask.execute();

            navigate('/productos');
        } catch (e) {
            switch ((e as Error).message) {
                case 'ErrorFormularioIncompleto':
                    toast(
                        'Olvidaste completar todos los campos del formulario.',
                        { type: 'warning' }
                    );
                    break;
                case 'ErrorPasswordsNoCoinciden':
                    toast(
                        'Las contraseñas no coinciden.',
                        { type: 'warning' }
                    );
                    break;
                case 'ErrorNombreUsuarioDuplicado':
                    toast(
                        'El nombre de usuario que seleccionaste ya existe.',
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
        const valorNombreUsuario = event.target.value;
        setNombreUsuario(valorNombreUsuario);
    }

    function handleNombreCompletoChange(
        event: ChangeEvent<HTMLInputElement>
    ) {
        const valorNombreCompleto = event.target.value;
        setNombreCompleto(valorNombreCompleto);
    }

    function handleCorreoChange(
        event: ChangeEvent<HTMLInputElement>
    ) {
        const valorCorreo = event.target.value;
        setCorreo(valorCorreo);
    }


    function handlePasswordChange(
        event: ChangeEvent<HTMLInputElement>
    ) {
        const valorPassword = event.target.value;
        setPassword(valorPassword);
    }

    function handleVerificarPasswordChange(
        event: ChangeEvent<HTMLInputElement>
    ) {
        const valorVerificarPassword = event.target.value;
        setVerificarPassword(valorVerificarPassword);
    }

    function handleDireccionChange(
        event: ChangeEvent<HTMLInputElement>
    ) {
        const valorDireccion = event.target.value;
        setDireccion(valorDireccion);
    }

    function handleNoTarjetaChange(
        event: ChangeEvent<HTMLInputElement>
    ) {
        const valorNoTarjeta = event.target.value;
        setNoTarjeta(parseInt(valorNoTarjeta));
    }

    function handleExpMesChange(
        event: ChangeEvent<HTMLInputElement>
    ) {
        const valorExpMes = event.target.value;
        setExpMes(parseInt(valorExpMes));
    }

    function handleExpAnoChange(
        event: ChangeEvent<HTMLInputElement>
    ) {
        const valorExpAno = event.target.value;
        setExpAno(parseInt(valorExpAno));
    }

    function handleCvvChange(
        event: ChangeEvent<HTMLInputElement>
    ) {
        const valorCvv = event.target.value;
        setCvv(parseInt(valorCvv));
    }

    return (
        <>
            <Form onSubmit={handleFormSubmit}>
                <Row>
                    <Col>
                        <Form.Group>
                        <FloatingLabel label="Nombre de usuario">
                            <Form.Control
                                required
                                type="text"
                                name="nombreUsuario"
                                placeholder='Usuario'
                                maxLength={20}
                                id="txtNombreUsuario"
                                value={nombreUsuario}
                                onChange={handleNombreUsuarioChange}
                            />
                        </FloatingLabel>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group>
                        <FloatingLabel label="Nombre completo">
                            <Form.Control
                                required
                                type="text"
                                name="nombreCompleto"
                                placeholder='Nombres Apellidos'
                                maxLength={60}
                                id="txtNombreCompleto"
                                value={nombreCompleto}
                                onChange={handleNombreCompletoChange}
                            />
                        </FloatingLabel>
                        </Form.Group>
                    </Col>

                </Row>
                <br></br>
                <Form.Group>
                    <FloatingLabel label="Correo">
                        <Form.Control
                            required
                            type="email"
                            name="correo"
                            placeholder='usuario@ejemplo.com'
                            maxLength={100}
                            id="txtCorreo"
                            value={correo}
                            onChange={handleCorreoChange}
                        />
                    </FloatingLabel>
                </Form.Group>
                <br></br>
                <Row>
                    <Col>
                        <Form.Group>
                        <FloatingLabel label="Contraseña">
                            <Form.Control
                                required
                                type="password"
                                minLength={8}
                                maxLength={32}
                                name="password"
                                placeholder='Contraseña'
                                id="txtPassword"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </FloatingLabel>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group>
                        <FloatingLabel label="Verificar contraseña">
                            <Form.Control
                                required
                                type="password"
                                minLength={8}
                                maxLength={32}
                                name="verificarPassword"
                                placeholder='Confirmación'
                                id="txtVerificarPassword"
                                value={verificarPassword}
                                onChange={handleVerificarPasswordChange}
                            />
                        </FloatingLabel>
                        </Form.Group>
                    </Col>
                </Row>
                <br></br>
                <Form.Group>
                    <FloatingLabel label="Dirección">
                        <Form.Control
                            required
                            type="text"
                            minLength={8}
                            maxLength={32}
                            name="direccion"
                            placeholder='Colonia Calle #000'
                            id="txtDireccion"
                            value={direccion}
                            onChange={handleDireccionChange}
                        />  
                    </FloatingLabel>
                </Form.Group>
                <br></br>

                <Col onMouseOver={handleMouseEnterCard} onMouseLeave={handleMouseLeaveCard} className="centerCard d-none d-lg-block d-inline-block">
                <div className="containerCard" style={{paddingTop: '10px'}}>
                    <div className="card-containerCard">
                            <div className="front">
                                <div className="image">
                                    <img src="https://thetrinitysession.com/wp-content/uploads/2020/01/cropped-TSLOGO.gif" alt="chip"/>
                                    <img src="https://seeklogo.com/images/V/VISA-logo-DD37676279-seeklogo.com.png" alt="visa logo"/>
                                </div>
                                <div className="card-number-box">{noTarjeta}</div>
                                <div className="flexbox">
                                    <div className="box">
                                        <span style={{fontWeight: 'bolder'}}>Titular</span>
                                        <div>{nombreCompleto}</div>
                                    </div>
                                    <div className="box">
                                        <span style={{fontWeight: 'bolder'}}>Vencimiento</span>
                                        <div className="expiration">
                                            <span>{expMes}</span>
                                            <span>-</span>
                                            <span>{expAno}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="back">
                                <div className="stripe"></div>
                                <div className="box">
                                    <span style={{fontWeight: 'bolder'}}>CVV</span>
                                    <div className="cvv-box">{cvv}</div>
                                    <img src="https://seeklogo.com/images/V/VISA-logo-DD37676279-seeklogo.com.png" alt="visa logo"/>
                                </div>
                            </div>
                    </div>
                </div>
                <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br>
                </Col>

                <Form.Group>
                    <FloatingLabel label="Número de tarjeta">
                        <Form.Control
                            required
                            type="number"
                            minLength={16}
                            maxLength={16}
                            name="noTarjeta"
                            placeholder='0000 - 0000 - 0000 - 0000'
                            id="txtNoTarjeta"
                            value={noTarjeta}
                            onChange={handleNoTarjetaChange}
                        /> 
                    </FloatingLabel>
                </Form.Group>
                <br></br>
                <Row>
                    <Col>
                        <Form.Group>
                        <FloatingLabel label="Mes">
                            <Form.Control
                                required
                                type="number"
                                minLength={2}
                                maxLength={2}
                                min="01"
                                max="12"
                                name="expMes"
                                placeholder='00'
                                id="txtExpMes"
                                value={expMes}
                                onChange={handleExpMesChange}
                            />
                        </FloatingLabel>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group>
                        <FloatingLabel label="Año">
                            <Form.Control
                                required
                                type="number"
                                minLength={2}
                                maxLength={2}
                                min="22"
                                max="30"
                                name="expAno"
                                placeholder='00'
                                id="txtExpAno"
                                value={expAno}
                                onChange={handleExpAnoChange}
                            />
                        </FloatingLabel>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group>
                        <FloatingLabel label="CVV">
                            <Form.Control
                                required
                                onMouseEnter={handleMouseEnterCard} 
                                onMouseLeave={handleMouseLeaveCard}
                                className="cvv-input"
                                type="number"
                                minLength={3}
                                maxLength={3}
                                name="cvv"
                                placeholder='000'
                                id="txtCvv"
                                value={cvv}
                                onChange={handleCvvChange}
                            />
                        </FloatingLabel>
                        </Form.Group>
                    </Col>
                </Row>
                <Button className='btn shadow ' type="submit" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{ background: 'linear-gradient(to right, rgba(102, 126, 234, 0.5), rgba(118, 75, 162, 0.5))', border:'none', color: isHovering ? 'white' : 'black'}}>
                    <FontAwesomeIcon icon={faSave} />&nbsp;
                            Registrar
                </Button>
            </Form>
        </>
    );
}
