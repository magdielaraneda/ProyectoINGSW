import axios from './root.service';

export const crearSala = async (salaData) => {
  try {
    const res = await axios.post('/salas', salaData);
    return res.data;
  } catch (error) {
    console.error('Error al crear sala:', error);
    throw error;
  }
};

export const obtenerSalas = async () => {
  try {
    const res = await axios.get('/salas');
    return res.data;
  } catch (error) {
    console.error('Error al obtener salas:', error);
    throw error;
  }
};

export const obtenerSalaPorNombre = async (nombreSala) => {
  try {
    const res = await axios.get(`/salas/${nombreSala}`);
    return res.data;
  } catch (error) {
    console.error(`Error al obtener sala ${nombreSala}:`, error);
    throw error;
  }
};

export const actualizarSalaPorNombre = async (nombreSala, salaData) => {
  try {
    const res = await axios.put(`/salas/${nombreSala}`, salaData);
    return res.data;
  } catch (error) {
    console.error(`Error al actualizar sala ${nombreSala}:`, error);
    throw error;
  }
};

export const eliminarSalaPorNombre = async (nombreSala) => {
  try {
    const res = await axios.delete(`/salas/${nombreSala}`);
    return res.data;
  } catch (error) {
    console.error(`Error al eliminar sala ${nombreSala}:`, error);
    throw error;
  }
};

export default {
  crearSala,
  obtenerSalas,
  obtenerSalaPorNombre,
  actualizarSalaPorNombre,
  eliminarSalaPorNombre,
};

