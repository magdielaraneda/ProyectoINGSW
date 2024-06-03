import Sala from '../models/salas.model.js';
import Edificio from '../models/edificio.model.js';

export const crearSala = async (req, res) => {
  try {
    const { nombre, aforo, nombreEdificio, estado } = req.body;

    
    const salaExistente = await Sala.findOne({ nombre });

    if (salaExistente) {
      return res.status(400).json({ mensaje: 'Ya existe una sala con ese nombre.' });
    }

    
    const edificio = await Edificio.findOne({ nombreEd: nombreEdificio });
    if (!edificio) {
      return res.status(400).json({ mensaje: 'El edificio especificado no existe.' });
    }

    
    const nuevaSala = new Sala({
      nombre,
      aforo,
      edificio: edificio._id,
      estado
    });

    await nuevaSala.save();

    res.status(201).json({ mensaje: 'Sala creada exitosamente.' });
  } catch (error) {
    console.error('Error al crear la sala:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
};



export const obtenerSalas = async (req, res) => {
  try {
    const salas = await Sala.find();
    res.status(200).json(salas);
  } catch (error) {
    console.error('Error al obtener las salas:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
};


export const obtenerSalaPorNombre = async (req, res) => {
  try {
    const { nombre } = req.params;
    const sala = await Sala.findOne({ nombre }).populate('edificio', 'nombreEd');

    if (!sala) {
      return res.status(404).json({ mensaje: 'Sala no encontrada.' });
    }

    res.status(200).json(sala);
  } catch (error) {
    console.error('Error al obtener la sala:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
};

export const actualizarSalaPorNombre = async (req, res) => {
  try {
    const { nombre } = req.params;
    const { aforo, nombreEdificio, estado } = req.body;

    
    const sala = await Sala.findOne({ nombre });
    if (!sala) {
      return res.status(404).json({ mensaje: 'Sala no encontrada.' });
    }

    
    let edificioId;
    if (nombreEdificio) {
      const edificio = await Edificio.findOne({ nombreEd: nombreEdificio });
      if (!edificio) {
        return res.status(400).json({ mensaje: 'El edificio especificado no existe.' });
      }
      edificioId = edificio._id;
    }

    
    sala.aforo = aforo || sala.aforo;
    sala.edificio = edificioId || sala.edificio;
    sala.estado = estado || sala.estado;

    
    await sala.save();

    res.status(200).json({ mensaje: 'Sala actualizada exitosamente.' });
  } catch (error) {
    console.error('Error al actualizar la sala:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
};



export const eliminarSalaPorNombre = async (req, res) => {
  try {
    const { nombre } = req.params;
    const sala = await Sala.findOneAndDelete({ nombre });

    if (!sala) {
      return res.status(404).json({ mensaje: 'Sala no encontrada.' });
    }

    res.status(200).json({ mensaje: 'Sala eliminada exitosamente.' });
  } catch (error) {
    console.error('Error al eliminar la sala:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
};

