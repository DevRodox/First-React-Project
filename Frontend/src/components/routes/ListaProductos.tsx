import { Badge, Button, OverlayTrigger,Tooltip, TooltipProps } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CatálogoProductos from '../CatálogoProductos';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import './scss/Espacios.scss';
import { RefAttributes, useState } from 'react';

export default function ListaProductos() {
    const navigate = useNavigate();

    const [isHovering, setIsHovering] = useState(false);

    const handleMouseEnter = () => {
    setIsHovering(true);
    };

    const handleMouseLeave = () => {
    setIsHovering(false);
    };


    function navegarARegistroProductos() {
        navigate('/productos/registrar');
    }

    const renderTooltip = (props: JSX.IntrinsicAttributes & TooltipProps & RefAttributes<HTMLDivElement>) => (
        <Tooltip id="button-tooltip" {...props}>
            Inventario.
        </Tooltip>
    );

    return (
        <>
            <div className="espacio-productos responsiveAlignment">
                <div className="encabezado">
                    <h3>Productos <Badge bg="dark">disponibles</Badge></h3>
                    
                            <OverlayTrigger
                                placement="right"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip}
                                >
                            <Button
                                className='btn shadow ' 
                                onMouseEnter={handleMouseEnter} 
                                onMouseLeave={handleMouseLeave} 
                                style={{ background: 'linear-gradient(to right, rgba(102, 126, 234, 0.5), rgba(118, 75, 162, 0.5))', border:'none', color: isHovering ? 'white' : 'black'}}
                                onClick={navegarARegistroProductos}
                            >
                                <FontAwesomeIcon icon={faPlusCircle} />&nbsp;
                                Registrar producto
                            </Button>
                            
                            </OverlayTrigger>
                </div>
                <CatálogoProductos />
            </div>
        </>
    );
}
