import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, FloatingLabel } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { toast } from 'react-toastify';
import Producto from '../models/Producto';
import RegistrarProductosTask from '../tasks/RegistrarProductosTask';
import './routes/scss/Espacios.scss';
import './scss/Focus.scss';

export default function FormularioRegistroProducto() {
    const [nombre, setNombre] = useState('');
    const [imagen, setImagen] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState(0);
    const [cantidad, setCantidad] = useState(0);
    const navigate = useNavigate();

    const [isHovering, setIsHovering] = useState(false);

    const handleMouseEnter = () => {
    setIsHovering(true);
    };

    const handleMouseLeave = () => {
    setIsHovering(false);
    };

    function handleFormControlChange(
        event: ChangeEvent<HTMLInputElement>
    ) {
        const valor = event.target.value;

        switch (event.target.name) {
            case 'nombre':
                setNombre(valor);
                break;
            case 'imagen':
                setImagen(valor);
                break;
            case 'descripcion':
                setDescripcion(valor);
                break;
            case 'precio':
                setPrecio(parseFloat(valor));
                break;
            case 'cantidad':
                setCantidad(parseInt(valor));
                break;
        }
    }

    async function handleFormSubmit(event: FormEvent) {
        event.preventDefault();

        try {
            const productoPorRegistrar = new Producto(
                undefined,
                nombre,
                imagen,
                descripcion,
                precio,
                cantidad
            );

            const registrarProductosTask = new RegistrarProductosTask(
                productoPorRegistrar
            );

            await registrarProductosTask.execute();

            toast(`"${nombre}" creado.`, { type: 'success' });

            navigate('/productos');
        } catch (e) {
            const mensajeError = (e as Error).message;

            switch (mensajeError) {
                case 'ErrorSesionExpiradaOInvalida':
                    localStorage.removeItem('tokenSesion');
                    navigate('/inicioSesion');
                    break;
                case 'ErrorFormularioIncompleto':
                    toast(
                        'Olvidaste llenar todos los campos del formulario.',
                        { type: 'warning' }
                    );
                    break;
                case 'ErrorProductoDuplicado':
                    toast(
                        'Ya existe ese producto.',
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

    return (
        <>
            <Form onSubmit={handleFormSubmit}>
                <Card className="border-0 shadow">
                    <img className="card-img-top rounded" style={{marginTop: '2%'}} src ="https://media11.s-nbcnews.com/i/mpx/2704722219/2022_09/1663855200144_tdy_style_9a_chen_tech_gadgets_fall_220922_1920x1080-4y7cv3.jpg" alt="fondo"></img>
                    <Card.Header>
                        <h3 style={{marginTop: '5%'}} >Registrar producto</h3>
                    </Card.Header>
                    <Card.Body>
                        <Form.Group>
                            <FloatingLabel label="Nombre">
                                <Form.Control
                                    required
                                    id="txtNombre"
                                    type="text"
                                    maxLength={20}
                                    name="nombre"
                                    placeholder='Nombre'
                                    value={nombre}
                                    onChange={handleFormControlChange}
                                />
                            </FloatingLabel>
                        </Form.Group>
                        <br></br>
                        <Form.Group>
                            <FloatingLabel label="Enlace de la imagen">
                                <Form.Control
                                    required
                                    id="txtImagen"
                                    type="text"
                                    maxLength={1000}
                                    name="imagen"
                                    placeholder='https://img.png'
                                    value={imagen}
                                    onChange={handleFormControlChange}
                                />
                            </FloatingLabel>
                        </Form.Group>
                        <br></br>
                        <Form.Group> 
                            <FloatingLabel label="Descripción">
                                <Form.Control
                                    required
                                    id="txtDescripcion"
                                    type="text"
                                    maxLength={20}
                                    name="descripcion"
                                    placeholder='Texto'
                                    value={descripcion}
                                    onChange={handleFormControlChange}
                                />  
                            </FloatingLabel>
                        </Form.Group>
                        <br></br>
                        <Form.Group>
                            <FloatingLabel label="Precio">
                                <Form.Control
                                    required
                                    id="txtPrecio"
                                    type="number"
                                    name="precio"
                                    placeholder='0000'
                                    value={precio}
                                    onChange={handleFormControlChange}
                                />
                            </FloatingLabel>
                        </Form.Group>
                        <br></br>
                        <Form.Group>
                            <FloatingLabel label="Cantidad">
                                <Form.Control
                                    required
                                    id="txtCantidad"
                                    type="number"
                                    min="1"
                                    name="cantidad"
                                    placeholder='0'
                                    value={cantidad}
                                    onChange={handleFormControlChange}
                                />
                            </FloatingLabel>
                        </Form.Group>
                    </Card.Body>
                    <Card.Footer>
                    <Button className='btn shadow ' type="submit" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{ background: 'linear-gradient(to right, rgba(102, 126, 234, 0.5), rgba(118, 75, 162, 0.5))', border:'none', color: isHovering ? 'white' : 'black'}}>
                            <FontAwesomeIcon icon={faSave} />&nbsp;
                            Registrar
                        </Button>
                    </Card.Footer>
                </Card>
            </Form>
        </>
    );
}
