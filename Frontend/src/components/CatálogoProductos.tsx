import { ChangeEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Producto from '../models/Producto';
import ProductosService from '../services/ProductosService';
import CardProducto from './CardProducto';
import Loader from './Loader';
import './routes/scss/Espacios.scss';
import { Form, Col, Row } from 'react-bootstrap';

export default function CatálogoProductos() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [productos, setProductos] = useState<Producto[]>([]);
    const [busqueda, setBusqueda] = useState('');
    const navigate = useNavigate();

    async function cargarProductos() {
        try {
            const servicioProductos = new ProductosService();
            const listaProductos = await servicioProductos.obtenerLista();

            setProductos(listaProductos);
            setIsLoaded(true);
        } catch (e) {
            if (
                e instanceof Error
                && e.message === 'ErrorSesionExpiradaOInvalida'
            ) {
                navigate('/inicioSesion');
                return;
            }
        }
    }

    function handleChange(
        event: ChangeEvent<HTMLInputElement>
    ) {
        const valorBusqueda = event.target.value;
        setBusqueda(valorBusqueda);
        filtrar(valorBusqueda);
    }

    function filtrar(terminoBusqueda: string){
        var resultadoBusqueda = productos.filter((elemento)=>{
            if(elemento.nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())){
                return elemento;
            }
        });

        if(!terminoBusqueda){
            cargarProductos();
        }
        setProductos(resultadoBusqueda)
        console.log('a');
    }

    useEffect(() => {
        if (!isLoaded) {
            cargarProductos();
        }
    });

    if (!isLoaded) {
        return <Loader />;
    }


    return (
        <>
            <Col id="searchCol" style={{ marginTop: '-9%', marginBottom: '5%', marginLeft: '80%', width: '20%'}}>
                <Form.Control
                    type="text"
                    placeholder="Buscar"
                    value={busqueda}
                    onChange={handleChange}
                />
            </Col>

            <Row>
                {
                    productos.map(producto => (
                        <CardProducto
                            key={producto.id}
                            producto={producto}
                        />
                    ))
                }
            </Row>
        </>
    );
}
