import { Link } from 'react-router-dom';
import { Card, Col, Row } from 'react-bootstrap';
import FormularioRegistro from '../FormularioRegistro';
import './scss/Espacios.scss';

export default function RegistroUsuario() {
    return (
        <>
            <Row className="espacio-productos">
                <Col className="encabezado" md={{ span: 6, offset: 3 }}>
                    <Card className="espacio-productos border-0 shadow">
                    <img className="card-img-top rounded" style={{marginTop: '2%'}} src ="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img3.webp" alt="fondo"></img>
                        <Card.Header>
                            <h3 style={{marginTop: '5%'}}>Crear cuenta</h3>
                        </Card.Header>
                        <Card.Body>
                            <FormularioRegistro />
                        </Card.Body>
                        <Card.Footer>
                            ¿Ya tienes cuenta?  <Link className="linkColor" to="/inicioSesion">Haz click aquí.</Link>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </>
    );
}
