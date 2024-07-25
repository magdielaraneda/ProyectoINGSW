import Sala from '../models/salas.model.js';
import Edificio from '../models/edificio.model.js';

export const crearSala = async (req, res) => {
  try {
    const { nombreSa, aforo, nombreEdificio, estado } = req.body;

    // Validar que el nombre de la sala contenga solo letras y números, máximo 10 caracteres
    const nombreValido = /^[a-zA-Z0-9]{1,10}$/.test(nombreSa);
    if (!nombreValido) {
      return res.status(400).json({ mensaje: 'El nombre de la sala debe contener solo letras y números, máximo 10 caracteres.' });
    }

    // Validar que el aforo sea como máximo 80 alumnos
    if (aforo > 80) {
      return res.status(400).json({ mensaje: 'El aforo máximo permitido es de 80 alumnos.' });
    }

    const salaExistente = await Sala.findOne({ nombreSa });

    if (salaExistente) {
      return res.status(400).json({ mensaje: 'Ya existe una sala con ese nombre.' });
    }

    const edificio = await Edificio.findOne({ nombreEd: nombreEdificio });
    if (!edificio) {
      return res.status(400).json({ mensaje: 'El edificio especificado no existe.' });
    }

    const nuevaSala = new Sala({
      nombreSa,
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
    const { nombreSa } = req.params;
    const sala = await Sala.findOne({ nombreSa }).populate('edificio', 'nombreEd');

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
    const { nombreSa } = req.params;
    const { aforo, nombreEdificio, estado } = req.body;

    // Validar que el nombre de la sala contenga solo letras y números, máximo 10 caracteres
    if (req.body.nombreSa) {
      const nombreValido = /^[a-zA-Z0-9]{1,10}$/.test(req.body.nombreSa);
      if (!nombreValido) {
        return res.status(400).json({ mensaje: 'El nombre de la sala debe contener solo letras y números, máximo 10 caracteres.' });
      }
    }

    // Validar que el aforo sea como máximo 80 alumnos
    if (req.body.aforo && req.body.aforo > 80) {
      return res.status(400).json({ mensaje: 'El aforo máximo permitido es de 80 alumnos.' });
    }

    const sala = await Sala.findOne({ nombreSa });
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
    const { nombreSa } = req.params;
    const sala = await Sala.findOneAndDelete({ nombreSa });

    if (!sala) {
      return res.status(404).json({ mensaje: 'Sala no encontrada.' });
    }

    res.status(200).json({ mensaje: 'Sala eliminada exitosamente.' });
  } catch (error) {
    console.error('Error al eliminar la sala:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
};