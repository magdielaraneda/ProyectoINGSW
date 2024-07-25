import ReactDOM from 'react-dom/client';
import App from './routes/App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root.jsx';
import ErrorPage from './routes/ErrorPage.jsx';
import Login from './routes/Login.jsx';
import CrearReserva from './routes/CrearReservaRoute';
import ListarReservas from './routes/ListarReservasRoute';
import DetalleReserva from './routes/DetalleReservaRoute';
import ObtenerSalaPorNombre from './routes/ObtenerSalaPorNombreRoute';
import ObtenerSalas from './routes/ObtenerSalasRoute';
import SalaForm from './routes/SalaFormRoute';
import ObtenerEdificioPorNombre from './routes/ObtenerEdificioPorNombreRoute';
import ObtenerEdificios from './routes/ObtenerEdificiosRoute';
import EdificioForm from './routes/EdificioFormRoute';




const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      { path: '/crearReserva', element: <CrearReserva /> },
      { path: '/listarReservas', element: <ListarReservas /> },
      { path: '/listarReservas/:id', element: <DetalleReserva /> },
      { path: '/obtenerSalas/:nombreSala', element: <ObtenerSalaPorNombre /> },
      { path: '/obtenerSalas', element: <ObtenerSalas /> },
      { path: '/crearSala', element: <SalaForm /> },
      { path: '/obtenerEdificios/:nombreEdificio', element: <ObtenerEdificioPorNombre /> },
      { path: '/obtenerEdificios', element: <ObtenerEdificios /> },
      { path: '/crearEdificio', element: <EdificioForm /> },
    ],
  },
  {
    path: '/auth',
    element: <Login />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
