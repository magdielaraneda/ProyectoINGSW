import React, { useState, useEffect } from 'react';
import { obtenerReservas } from '../services/reserva.service';
import { Link } from 'react-router-dom';

function ListarReservas() {
  const [reservas, setReservas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const data = await obtenerReservas();
        setReservas(data);
      } catch (error) {
        console.error('Error al obtener las reservas:', error);
        setError('Error al obtener las reservas.');
      }
    };

    fetchReservas();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Listado de Reservas</h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {reservas.map((reserva) => (
          <div key={reserva._id} className="bg-white border border-gray-300 rounded-lg shadow-lg p-4">
            <h3 className="text-lg font-bold mb-2">{reserva.docenteNombre}</h3>
            <p>Fecha: {new Date(reserva.fecha).toLocaleDateString()}</p>
            <p>Hora inicio: {new Date(reserva.horaInicio).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            <p>Hora fin: {new Date(reserva.horaFin).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            <p>Edificio: {reserva.edificio.nombreEd}</p>
            <p>Sala: {reserva.sala.nombreSa}</p>
            <p>Estado: {reserva.estadoReserva}</p>
            <Link to={`/listarReservas/${reserva._id}`} className="text-blue-500 mt-2 block">
              Ver detalles
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListarReservas;
