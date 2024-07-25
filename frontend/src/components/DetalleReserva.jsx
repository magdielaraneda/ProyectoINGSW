import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { obtenerReservaPorId, eliminarReservaPorId } from '../services/reserva.service';
import { showCancelarReserva } from '../helpers/swaHelper';

function DetalleReserva() {
  const { id } = useParams();
  const [reserva, setReserva] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReserva = async () => {
      try {
        const data = await obtenerReservaPorId(id);
        setReserva(data);
      } catch (error) {
        console.error('Error al obtener la reserva:', error);
        setError('Error al obtener la reserva.');
      }
    };

    fetchReserva();
  }, [id]);

  const handleEliminarReserva = async () => {
    try {
      await eliminarReservaPorId(id);
      console.log('Reserva eliminada exitosamente');
      showCancelarReserva();
      navigate('/');
    } catch (error) {
      console.error('Error al eliminar la reserva:', error);
      setError('Error al eliminar la reserva.');
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!reserva) {
    return <div>Cargando reserva...</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Detalle de Reserva</h2>
      <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-4">
        <h3 className="text-lg font-bold mb-2">{reserva.docenteNombre}</h3>
        <p>Fecha: {new Date(reserva.fecha).toLocaleDateString()}</p>
        <p>Hora inicio: {new Date(reserva.horaInicio).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        <p>Hora fin: {new Date(reserva.horaFin).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        <p>Edificio: {reserva.edificio.nombreEd}</p>
        <p>Sala: {reserva.sala.nombreSa}</p>
        <p>Estado: {reserva.estadoReserva}</p>
        <p>Correo del docente: {reserva.docenteCorreo}</p>
        <button className="bg-red-500 text-white px-4 py-2 rounded mt-4" onClick={handleEliminarReserva}>
          Eliminar Reserva
        </button>
      </div>
    </div>
  );
}

export default DetalleReserva;
