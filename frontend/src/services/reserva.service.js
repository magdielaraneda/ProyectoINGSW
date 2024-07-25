import axios from './root.service';

export const crearReserva = async (reservaData) => {
  try {
    const res = await axios.post('/reservas', reservaData);
    return res.data;
  } catch (error) {
    console.error('Error al crear reserva:', error);
    throw error;
  }
};

export const obtenerReservas = async () => {
  try {
    const res = await axios.get('/reservas');
    console.log (res.data)
    return res.data;
  } catch (error) {
    console.error('Error al obtener reservas:', error);
    throw error;
  }
};

export const obtenerReservaPorId = async (idReserva) => {
  try {
    const res = await axios.get(`/reservas/${idReserva}`);
    return res.data;
  } catch (error) {
    console.error(`Error al obtener reserva ${idReserva}:`, error);
    throw error;
  }
};

export const eliminarReservaPorId = async (idReserva) => {
  try {
    const res = await axios.delete(`/reservas/${idReserva}`);
    return res.data;
  } catch (error) {
    console.error(`Error al eliminar reserva ${idReserva}:`, error);
    throw error;
  }
};

export default {
  crearReserva,
  obtenerReservas,
  obtenerReservaPorId,
  eliminarReservaPorId,
};
