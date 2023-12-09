import { Row, Col, Spinner } from 'react-bootstrap';
import './routes/scss/Espacios.scss';
import './scss/Loader.scss';

export default function Loader() {
    return (
        <>
            <Row>
                <Col className="loader-container">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    Cargando...
                </Col>
            </Row>
        </>
    );
}
