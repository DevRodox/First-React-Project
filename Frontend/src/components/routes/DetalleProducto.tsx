import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Producto from '../../models/Producto';
import ProductosService from '../../services/ProductosService';
import FormularioActualizarProducto from '../FormularioActualizarProducto';
import NoEncontrado from './NoEncontrado';
import Loader from '../Loader';
import './scss/Espacios.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward } from '@fortawesome/free-solid-svg-icons';

export default function DetalleProductos() {
    const { idProducto } = useParams();
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    const [producto, setProducto] = useState<Producto | undefined>(undefined);

    async function loadProducto() {
        const id = parseInt(idProducto as string);

        if (isNaN(id)) {
            navigate('/productos');
            return;
        }

        try {
            const servicioProductos = new ProductosService();
            const productoEncontrado = await servicioProductos.obtenerPorId(id);
            setProducto(productoEncontrado);
        } catch (e) {
            if (e instanceof Error && e.message === 'ErrorProductoNoEncontrado') {

            } else {
                toast('Ha ocurrido un error desconocido.', { type: 'error' });
                navigate('/productos');
                return;
            }
        }

        setIsLoaded(true);
    }

    useEffect(() => {
        if (!isLoaded) {
            loadProducto();
        }
    });

    if (!isLoaded) {
        return <Loader />;
    }

    if (!producto) {
        return (
            <>
                <NoEncontrado/>
            </>
        );
    }

    return (
        <>
            <Row className="espacio-productos">
                <Col className="encabezado" md={{ span: 8, offset: 2 }}>
                    <h3>{producto.nombre}</h3>
                    <Link className="linkColor" to="/productos"><FontAwesomeIcon className=".iconBackColor" icon={faBackward}/>&nbsp;</Link>
                    <FormularioActualizarProducto producto={producto} />
                </Col>
            </Row>
        </>
    );
}
