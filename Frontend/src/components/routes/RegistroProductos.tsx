import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import FormularioRegistroProducto from '../FormularioRegistroProducto';
import './scss/Espacios.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBackward} from '@fortawesome/free-solid-svg-icons';

export default function RegistroProductos() {
    return (
        <>
            <Row className="espacio-productos encabezado">
                <Col className="encabezado" md={{ span: 8, offset: 2 }}>
                    <Link className="linkColor" to="/productos"><FontAwesomeIcon className=".iconBackColor" icon={faBackward}/>&nbsp;</Link>
                    <FormularioRegistroProducto />
                </Col>
            </Row>
        </>
    );
}
