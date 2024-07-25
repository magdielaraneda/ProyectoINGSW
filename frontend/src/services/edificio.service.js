import axios from './root.service';


export const obtenerEdificios = async () => {
  try {
    const res = await axios.get('/edificios');
    console.log (res.data, "aqui estoy en el service")
    return res.data;
    
  } catch (error) {
    console.error('Error al obtener edificios:', error);
    throw error;
  }
};


export const obtenerEdificioPorNombre = async (nombreEd) => {
  try {
    const res = await axios.get(`/edificios/${nombreEd}`);
    return res.data;
  } catch (error) {
    console.error(`Error al obtener el edificio ${nombreEd}:`, error);
    throw new Error(`Error al obtener el edificio ${nombreEd}`);
  }
};

export const crearEdificio = async (edificioData) => {
  try {
    const res = await axios.post('/edificios', edificioData);
    return res.data;
  } catch (error) {
    console.error('Error al crear edificio:', error);
    throw new Error('Error al crear edificio');
  }
};

export const eliminarEdificioPorNombre = async (nombreEd) => {
  try {
    const res = await axios.delete(`/edificios/${nombreEd}`);
    return res.data;
  } catch (error) {
    console.error(`Error al eliminar edificio ${nombreEd}:`, error);
    throw new Error(`Error al eliminar edificio ${nombreEd}`);
  }
};

export default {
  obtenerEdificios,
  obtenerEdificioPorNombre,
  crearEdificio,
  eliminarEdificioPorNombre,
};
