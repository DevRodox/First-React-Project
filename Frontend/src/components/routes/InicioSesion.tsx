import { Link } from 'react-router-dom';
import { Card, Col, Row } from 'react-bootstrap';
import FormularioInicioSesion from '../FormularioInicioSesion';
import './scss/Espacios.scss';

export default function InicioSesion() {
    return (
        <>
            <Row className="centrado responsiveCenter">
                <Col md={{ span: 6, offset: 3 }}>
                    <Card className="border-0 espacio-sesión shadow">
                        <Card.Header>
                            <h3>Iniciar sesión</h3>
                        </Card.Header>
                        <Card.Body>
                            <FormularioInicioSesion />
                        </Card.Body>
                        <Card.Footer>
                        ¿No tienes cuenta?  <Link className="linkColor" to="/registro">Haz click aquí.</Link>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col className="responsiveImg .d-none .d-sm-block">
                    <img src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg" className="w-100 rounded shadow imgPadding img-fluid" alt=""/>
                </Col>
            </Row>
        </>
    );
}
