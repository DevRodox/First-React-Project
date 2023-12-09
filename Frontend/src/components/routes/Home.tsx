import { Outlet } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import { Container, Nav, Navbar} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faLaptop, faUser} from '@fortawesome/free-solid-svg-icons';
import AppFooter from '../AppFooter';
import './scss/Navbar.scss';
import './scss/Espacios.scss';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import AppNavbar from '../AppNavbar';
import Bienvenida from './Bienvenida';

export default function Home() {
    const navigate = useNavigate();

    function irABienvenida() {
        navigate('/bienvenida');
    }

    function irAProductos() {
        navigate('/productos');
    }

    function irASesión() {
        navigate('/registro');
    }

    const tokenSesion = localStorage.getItem('tokenSesion');
    if (tokenSesion) {
        return (
            <>
                <AppNavbar/>
                <Bienvenida/>
                <AppFooter/>
            </>
        );
    }
            
    return (
        <>
                <Navbar className="site-header sticky-top py-1"  collapseOnSelect expand="lg" style={{ background: 'linear-gradient(to right, rgba(102, 126, 234, 0.5), rgba(118, 75, 162, 0.5))' }}>
                    <Container>
                        <Navbar.Brand onClick={irABienvenida}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="d-block mx-auto iconColor" role="img" viewBox="0 0 24 24"><title>Product</title><circle cx="12" cy="12" r="10"/><path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94"/></svg></Navbar.Brand>
                        <NavbarToggle  data-bs-toggle="collapse" data-bs-target="#navbar"></NavbarToggle>
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="ms-auto">
                                <Nav.Link eventKey={1} className="py-2 d-none d-md-inline-block iconColor" onClick={irAProductos} ><FontAwesomeIcon className="iconColor" icon={faLaptop}/>&nbsp;Productos</Nav.Link>
                                <Nav.Link className="py-2 d-none d-md-inline-block iconColor" onClick={irASesión} ><FontAwesomeIcon className="iconColor"  icon={faUser}/>&nbsp;Sesión</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Outlet />
                <AppFooter/>
        </>
    );
}
