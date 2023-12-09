import { Container} from 'react-bootstrap';
import './routes/scss/Espacios.scss';

export default function AppFooter() {
return (
    <>
        <Container fluid>
            <footer className="container py-5">
            <div className="row">
                <div className="col-12 col-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="d-block mb-2" role="img" viewBox="0 0 24 24"><title>Product</title><circle cx="12" cy="12" r="10"/><path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94"/></svg>
                <small className="d-block mb-3 linkColor">&copy; 2022 - Desarrollo web</small>
                </div>
                <div className="col-6 col-md">
                <h5>Recursos</h5>
                <ul className="list-unstyled text-small">
                    <li><span className="linkColor">Negocio</span></li>
                    <li><span className="linkColor">Gaming</span></li>
                </ul>
                </div>
                <div className="col-6 col-md">
                <h5>Información</h5>
                <ul className="list-unstyled text-small">
                    <li><span className="linkColor">Equipo</span></li>
                    <li><span className="linkColor">Ubicación</span></li>
                    <li><span className="linkColor">Privacidad</span></li>
                    <li><span className="linkColor">Términos</span></li>
                </ul>
                </div>
            </div>
            </footer>
        </Container>
    </>
);
}