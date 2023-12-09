import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './components/routes/Home';
import Productos from './components/routes/Productos';
import RegistroUsuario from './components/routes/RegistroUsuario';
import InicioSesion from './components/routes/InicioSesion';
import ListaProductos from './components/routes/ListaProductos';
import RegistroProductos from './components/routes/RegistroProductos';
import DetalleProducto from './components/routes/DetalleProducto';
import 'react-toastify/dist/ReactToastify.css';
import Bienvenida from './components/routes/Bienvenida';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/',
        index: true,
        element: <Navigate to="/bienvenida" />
      },
      {
        path: '/bienvenida',
        element: <Bienvenida />
      },
      {
        path: '/registro',
        element: <RegistroUsuario />
      },
      {
        path: '/inicioSesion',
        element: <InicioSesion />
      }
    ]
  },
  {
    path: '/productos',
    element: <Productos />,
    children: [
      {
        path: '/productos',
        index: true,
        element: <ListaProductos />
      },
      {
        path: '/productos/registrar',
        element: <RegistroProductos />
      },
      {
        path: '/productos/:idProducto',
        element: <DetalleProducto />
      }
    ]
  }
]);

export default function App() {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={appRouter} />
    </>
  );
}
