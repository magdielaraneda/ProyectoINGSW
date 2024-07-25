import Reserva from '../models/reservas.model.js';
import Sala from '../models/salas.model.js';
import Edificio from '../models/edificio.model.js';
import { enviarCorreoConfirmacion } from '../utils/correo.js';
import { respondError, respondSuccess } from '../utils/resHandler.js';

export const crearReserva = async (req, res) => {
  try {
    const { fecha, horaInicio, horaFin, edificio, sala, docenteNombre, docenteCorreo } = req.body;

    // Validar que el nombre del docente contenga solo letras y espacios
    const nombreDocenteValido = /^[a-zA-Z\s]+$/.test(docenteNombre);
    if (!nombreDocenteValido) {
      return respondError(req, res, 400, 'El nombre del docente debe contener solo letras y espacios.');
    }

    const fechaReserva = new Date(fecha);
    const horaInicioDate = new Date(`1970-01-01T${horaInicio}`);
    const horaFinDate = new Date(`1970-01-01T${horaFin}`);

    // Verificar que la fecha de reserva no sea en el pasado
    const fechaActual = new Date();
    if (fechaReserva < fechaActual) {
      return respondError(req, res, 400, 'No se pueden crear reservas para fechas pasadas.');
    }

    // Verificar que el correo del docente sea válido
    if (!docenteCorreo || !docenteCorreo.endsWith('@alumnos.ubiobio.cl')) {
      return respondError(req, res, 400, 'Por favor, proporciona un correo electrónico válido de la Universidad del Bío-Bío.');
    }

    // Buscar el edificio por nombre para obtener su ID
    const edificioEncontrado = await Edificio.findOne({ nombreEd: edificio });
    if (!edificioEncontrado) {
      return respondError(req, res, 400, 'El edificio especificado no existe.');
    }

    // Buscar la sala por nombre exacto y asegurarse de que pertenezca al edificio especificado
    const salaEncontrada = await Sala.findOne({ nombreSa: sala, edificio: edificioEncontrado._id });
    if (!salaEncontrada) {
      return respondError(req, res, 400, 'La sala especificada no existe en el edificio seleccionado.');
    }

    // Verificar disponibilidad de la sala en el horario especificado
    const reservaExistente = await Reserva.findOne({
      fecha,
      sala: salaEncontrada._id,
      $or: [
        { $and: [{ horaInicio: { $lte: horaInicioDate } }, { horaFin: { $gte: horaInicioDate } }] },
        { $and: [{ horaInicio: { $lte: horaFinDate } }, { horaFin: { $gte: horaFinDate } }] }
      ]
    });

    if (reservaExistente) {
      return respondError(req, res, 400, 'La sala ya está reservada en el horario especificado.');
    }

    // Crear la nueva reserva utilizando los IDs encontrados
    const nuevaReserva = new Reserva({
      fecha,
      horaInicio: horaInicioDate,
      horaFin: horaFinDate,
      edificio: edificioEncontrado._id,
      sala: salaEncontrada._id,
      docenteCorreo,
      docenteNombre,
      estadoReserva: 'Reservada'
    });

    await nuevaReserva.save();

    // Construir el mensaje de confirmación
    const mensajeCorreo = `Hola ${docenteNombre},\n\nTu reserva de sala ha sido confirmada exitosamente.\n\nDetalles de la reserva:\n- Edificio: ${edificioEncontrado.nombreEd}\n- Sala: ${salaEncontrada.nombreSa}\n- Fecha: ${fecha}\n- Hora de inicio: ${horaInicio}\n- Hora de fin: ${horaFin}\n\nGracias por utilizar nuestro sistema de reservas.`;

    // Enviar el correo de confirmación
    await enviarCorreoConfirmacion(docenteCorreo, docenteNombre, edificioEncontrado.nombreEd, salaEncontrada.nombreSa, fecha, horaInicio, horaFin);

    // Respondemos con éxito
    return respondSuccess(req, res, 201, 'Reserva creada exitosamente.');

  } catch (error) {
    // Capturamos cualquier error y respondemos con un error interno del servidor
    console.error('Error al crear la reserva:', error);
    return respondError(req, res, 500, 'Error interno del servidor.');
  }
};


export const obtenerReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find().populate('sala', 'nombreSa').populate('edificio', 'nombreEd');
    res.status(200).json(reservas);
  } catch (error) {
    console.error('Error al obtener las reservas:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
};

export const obtenerReservaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const reserva = await Reserva.findById(id).populate('sala', 'nombreSa').populate('edificio', 'nombreEd');

    if (!reserva) {
      return res.status(404).json({ mensaje: 'Reserva no encontrada.' });
    }

    res.status(200).json(reserva);
  } catch (error) {
    console.error('Error al obtener la reserva:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
};

export const eliminarReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const reserva = await Reserva.findByIdAndDelete(id);

    if (!reserva) {
      return respondError(req, res, 404, 'Reserva no encontrada.');
    }

    return respondSuccess(req, res, 200, 'Reserva eliminada exitosamente.');
  } catch (error) {
    console.error('Error al eliminar la reserva:', error);
    return respondError(req, res, 500, 'Error interno del servidor.');
  }
};
