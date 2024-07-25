import Edificio from '../models/edificio.model.js';
import { respondError, respondSuccess } from '../utils/resHandler.js';

export const crearEdificio = async (req, res) => {
  try {
    const { nombreEd, cantidadSalas } = req.body;

    const nombreEdValido = /^[a-zA-Z0-9]{1,20}$/.test(nombreEd);
    if (!nombreEdValido) {
      return respondError(req, res, 400, 'El nombre del edificio debe contener solo letras y números, y tener máximo 20 caracteres.');
    }

    if (cantidadSalas > 40) {
      return respondError(req, res, 400, 'El número máximo de salas por edificio es 40.');
    }

    const edificioExistente = await Edificio.findOne({ nombreEd });
    if (edificioExistente) {
      return respondError(req, res, 400, 'Ya existe un edificio con ese nombre.');
    }

    const nuevoEdificio = new Edificio({
      nombreEd,
      cantidadSalas
    });

    await nuevoEdificio.save();

    return respondSuccess(req, res, 201, { mensaje: 'Edificio creado exitosamente.' });
  } catch (error) {
    console.error('Error al crear el edificio:', error);
    return respondError(req, res, 500, 'Error interno del servidor.');
  }
};

export const obtenerEdificios = async (req, res) => {
  try {
    const edificios = await Edificio.find();
    res.status(200).json(edificios);
  } catch (error) {
    console.error('Error al obtener los edificios:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
};

export const obtenerEdificioPorNombre = async (req, res) => {
  try {
    const { nombreEd } = req.params;
    const edificio = await Edificio.findOne({ nombreEd });

    if (!edificio) {
      return res.status(404).json({ mensaje: 'Edificio no encontrado.' });
    }

    res.status(200).json(edificio);
  } catch (error) {
    console.error('Error al obtener el edificio:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
};


export const eliminarEdificioPorNombre = async (req, res) => {
  try {
    const { nombreEd } = req.params;
    const edificio = await Edificio.findOneAndDelete({ nombreEd });

    if (!edificio) {
      return respondError(req, res, 404, 'Edificio no encontrado.');
    }

    return respondSuccess(req, res, 200, { mensaje: 'Edificio eliminado exitosamente.' });
  } catch (error) {
    console.error('Error al eliminar el edificio:', error);
    return respondError(req, res, 500, 'Error interno del servidor.');
  }
};
