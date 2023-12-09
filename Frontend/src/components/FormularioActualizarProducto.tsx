import { Form, Card, Button, Modal, ButtonGroup, FloatingLabel } from 'react-bootstrap';
import { ChangeEvent, FormEvent, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { faTrashCan} from '@fortawesome/free-regular-svg-icons';
import Producto from '../models/Producto';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import ProductosService from '../services/ProductosService';
import ActualizarProductosTask from '../tasks/ActualizarProductosTask';
import './routes/scss/Espacios.scss';
import './scss/Focus.scss';

interface FormularioActualizarProductosProps {
    producto: Producto
}

export default function FormularioActualizarAuto(
    { producto }: FormularioActualizarProductosProps
) {
    const [nombre, setNombre] = useState(producto.nombre);
    const [imagen, setImagen] = useState(producto.imagen);
    const [descripcion, setDescripcion] = useState(producto.descripcion);
    const [precio, setPrecio] = useState(producto.precio);
    const [cantidad, setCantidad] = useState(producto.cantidad);


    const {idProducto} = useParams();

    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

            const id = parseInt(idProducto as string);

            if(isNaN(id)){
                navigate('/productos')
                return;
            }

            const productoPorActualizar = producto
                productoPorActualizar.nombre = nombre
                productoPorActualizar.imagen = imagen
                productoPorActualizar.descripcion = descripcion
                productoPorActualizar.precio = precio

            const actualizarProductoTask = new ActualizarProductosTask(
                productoPorActualizar
            );

            await actualizarProductoTask.execute();
            navigate(`/productos/${producto.id}`);

            toast(`"${nombre}" actualizado.`, { type: 'success' });

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

    const eliminar = () => {
        try {
            const tokenSesion = localStorage.getItem('tokenSesion');
            if(!tokenSesion){
                throw new Error('ErrorSesionExpiradaOInvalida');
            }

            const id = parseInt(idProducto as string);

            if(isNaN(id)){
                navigate('/productos')
                return;
            }
    
            const servicioProductos = new ProductosService();
            servicioProductos.eliminar(producto);
            navigate('/productos');

        } catch (e) {
            if(e instanceof Error){
                switch(e.message){
                    case 'ErrorSesionExpiradaOInvalida':
                        localStorage.removeItem('tokenSesion');
                        navigate('/inicioSesion');
                        return;
                    case 'ErrorProductoNoEncontrado':
                        window.alert('Producto no encontrado.');
                        navigate('/productos');
                        return;
                    default:
                        window.alert('Ha ocurrido un error desconocido.');
                        navigate('/productos');
                        return;
                }
            }
        }
    }

    return (
        <>
            <Form onSubmit={handleFormSubmit}>
                <Card className="border-0 shadow">
                    <img className="card-img-top rounded" style={{marginTop: '2%'}} src ="https://fotografias.antena3.com/clipping/cmsimages01/2022/05/26/F705EEEE-2EB0-4096-82DB-4ECDA3788729/datos-paquete_98.jpg?crop=2125,1196,x0,y0&width=1900&height=1069&optimize=high&format=webply" alt="fondo"></img>
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
                        <ButtonGroup aria-label="Basic example">
                            <Button className='btn shadow ' type="submit" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{ background: 'linear-gradient(to right, rgba(102, 126, 234, 0.5), rgba(118, 75, 162, 0.5))', border:'none', color: isHovering ? 'white' : 'black'}}>
                                <FontAwesomeIcon icon={faSave} />&nbsp;
                                Actualizar
                            </Button>

                            <Button onClick={handleShow} className='btn shadow ' style={{ background: 'linear-gradient(to right, #E87FA5, #F74859)', border:'none', color: isHovering ? 'white' : 'black'}}>
                                <FontAwesomeIcon icon={faTrashCan} />&nbsp;
                                Eliminar
                            </Button>
                        </ButtonGroup>
                    </Card.Footer>

                    <Modal show ={show} onHide={handleClose} backdrop="static" keyboard={false}>
                        <Modal.Header closeButton>
                            <Modal.Title>Eliminación</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            ¿Seguro que desea eliminar este producto? Se descontinuará todo su inventario.
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className='btn shadow ' type="submit" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}  style={{ background: 'linear-gradient(to right, #E87FA5, #F74859)', border:'none', color: isHovering ? 'white' : 'black'}} onClick={eliminar}>
                                Sí
                            </Button>
                            <Button style={{ background: 'linear-gradient(to right, rgba(102, 126, 234, 0.5), rgba(118, 75, 162, 0.5))', border:'none', color: isHovering ? 'white' : 'black'}} onClick={handleClose}>
                                No
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Card>
            </Form>
        </>
    );
}