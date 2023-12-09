import { useState } from "react";
import { Button, Carousel, Container} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './scss/Bootstrap.min.scss';
import './scss/Imágenes.scss';
import './scss/Producto.scss';
import './scss/Espacios.scss';

export default function Bienvenida(){
    
    const styles = {
        container: {
            width: "80%",
            minHeight: '70%',
            maxHeight: '70%',
            borderRadius: "21px 21px 0 0",
            
        },
    } as const;

    const navigate = useNavigate();

    const [isHovering, setIsHovering] = useState(false);

    const handleMouseEnter = () => {
    setIsHovering(true);
    };

    const handleMouseLeave = () => {
    setIsHovering(false);
    };

    function irAProductos() {
        navigate('/productos');
    }

    return(
        <>
            <Container fluid>
            <Carousel>
                <Carousel.Item>
                    <img
                    className="d-block w-100 imgCarousel img-fluid"
                    src="https://images.ctfassets.net/9mt55bm0937w/1VhXxVR2AP6jpbAaXKdr4I/6ba92dd0b690f2b59fc2caae3991504f/Key-Visual_Flexible-Office_Frankfurt_Wiesenh__ttenplatz.jpg"
                    alt="Second slide"
                    />

                    <Carousel.Caption>
                    <h3>Un must have</h3>
                    <p>Aumenta tu productividad.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100 imgCarousel img-fluid"
                    src="https://i.blogs.es/c62ae3/gadgets-min/840_560.jpg"
                    alt="First slide"
                    />
                    <Carousel.Caption>
                    <h3>Gadgets</h3>
                    <p>Complementa tu estilo computacional.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100 imgCarousel img-fluid"
                    src="https://letsrebold.com/wp-content/uploads/2022/06/Tendiencias-de-eposrts-y-gaming-2022.jpg"
                    alt="Third slide"
                    />

                    <Carousel.Caption>
                    <h3>Disfruta del gaming</h3>
                    <p>
                        Potencia tu desempeño.
                    </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
    
                <main>
                <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
                    <div className="col-md-5 p-lg-5 mx-auto my-5">
                    <h1 className="display-4 fw-normal">Inventario de accesorios</h1>
                    <p className="lead fw-normal">Descubre periféricos para tu laptop</p>
                    <Button className='btn shadow ' type="submit"  onClick={irAProductos}onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{ background: 'linear-gradient(to right, rgba(102, 126, 234, 0.5), rgba(118, 75, 162, 0.5))', border:'none', color: isHovering ? 'white' : 'black'}}>Explora</Button>
                    </div>
                    <div className="product-device responsive-device shadow-sm d-none d-md-block"></div>
                    <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
                </div>
                
                <div className="d-md-flex flex-md-equal w-100 my-md-3 ps-md-3">
                    <div className="text-bg-dark me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
                    <div className="my-3 py-3">
                        <h2 className="display-5">Mouses</h2>
                        <p className="lead">Disfruta de respuesta inmediata para MMORPGs y sensibilidad a tope.</p>
                    </div>
                    <div className="bg-light shadow-sm mx-auto" style={styles.container}>
                        <img className="img-fluid" style={styles.container} src="https://media.flixcar.com/f360cdn/Logitech-55304835-g604-gallery-5-zoom.png" alt="mouses"></img>
                    </div>
                    </div>
                    <div className="bg-light me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
                    <div className="my-3 p-3">
                        <h2 className="display-5">Teclados</h2>
                        <p className="lead">Encuentra lo ideal para tu oficina.</p>
                    </div>
                    <div className="bg-dark shadow-sm mx-auto" style={styles.container}>
                        <img className="img-fluid" style={styles.container} src="https://www.invidcomputers.com/thumb/000000000041227171624K380W1_800x800.png" alt="teclado"></img>
                    </div>
                    </div>
                </div>
                
                <div className="d-md-flex flex-md-equal w-100 my-md-3 ps-md-3">
                    <div className="bg-light me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
                    <div className="my-3 p-3">
                        <h2 className="display-5">Audífonos</h2>
                        <p className="lead">Sumérgete en una escucha envolvente con la mejor calidad.</p>
                    </div>
                    <div className="bg-dark shadow-sm mx-auto" style={styles.container}>
                        <img className="img-fluid" style={styles.container} src="https://resource.logitech.com/content/dam/gaming/en/products/audio/g735-wireless-headset/gallery/g735-gallery-1.png" alt="audífonos"></img>
                    </div>
                    </div>
                    <div className="text-bg-dark me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
                    <div className="my-3 py-3">
                        <h2 className="display-5">Cámaras</h2>
                        <p className="lead">Sube el nivel de tus streams con altas resoluciones.</p>
                    </div>
                    <div className="bg-light shadow-sm mx-auto" style={styles.container}>
                        <img className="img-fluid" style={styles.container} src="http://cdn.shopify.com/s/files/1/0787/6455/products/logitech_brio_frontal.png?v=1593889177" alt="cámara"></img>
                    </div>
                    </div>
                </div>
                </main>
            </Container>
        </>
    );
}