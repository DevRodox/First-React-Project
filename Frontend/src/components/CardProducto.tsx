import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Button, Card, Col} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Producto from '../models/Producto';
import './scss/Card.scss';
import './routes/scss/Espacios.scss';
import './scss/RenglonTablaProductos.scss'

interface RenglonTablaProductosProps {
    producto: Producto
}

export default function CardProducto(
    { producto: prod }: RenglonTablaProductosProps
): JSX.Element {
    const navigate = useNavigate();

    const [isHovering, setIsHovering] = useState(false);

    const handleMouseEnter = () => {
    setIsHovering(true);
    };

    const handleMouseLeave = () => {
    setIsHovering(false);
    };

    function navegarDetalleProducto() {
        navigate(`/productos/${prod.id}`);
    }

    return (
        <>
                <Col className="col-lg-3 d-flex align-items-stretch" style={{marginBottom: '3%'}}>
                    <Card className="border-0 shadow" style={{ width: '18rem' }}>
                        <div className="containerFor">
                            <Card.Img  className="card-img-top card-img-top-adjustment" variant="top" src={prod.imagen} />
                        </div>
                        <Card.Body>
                            <Card.Title>{prod.nombre}</Card.Title>
                            <Card.Text>
                                {prod.descripcion}
                            </Card.Text>
                            <Button className='btn shadow ' type="submit" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{ background: 'linear-gradient(to right, rgba(102, 126, 234, 0.5), rgba(118, 75, 162, 0.5))', border:'none', color: isHovering ? 'white' : 'black'}} onClick={navegarDetalleProducto}>
                                <FontAwesomeIcon icon={faEdit} />&nbsp;
                                Editar
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
        </>
    );
}
