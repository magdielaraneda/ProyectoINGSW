import Reserva from '../models/reservas.model.js';
import { enviarCorreoConfirmacion } from '../utils/correo.js';

export const crearReserva = async (req, res) => {
  try {
    const { fecha, horaInicio, horaFin, edificio, sala, docenteNombre, docenteCorreo } = req.body;

    
    if (!docenteCorreo || !docenteCorreo.endsWith('@alumnos.ubiobio.cl')) {
      return res.status(400).json({ mensaje: 'Por favor, proporciona un correo electrónico válido de la Universidad del Bío-Bío.' });
    }

    
    const horaInicioDate = new Date(`1970-01-01T${horaInicio}`);
    const horaFinDate = new Date(`1970-01-01T${horaFin}`);
    if (horaInicioDate >= horaFinDate) {
      return res.status(400).json({ mensaje: 'La hora de inicio debe ser menor que la hora de fin.' });
    }

    
    const reservaExistente = await Reserva.findOne({
      fecha,
      sala,
      $or: [
        { $and: [{ horaInicio: { $lte: horaInicioDate } }, { horaFin: { $gte: horaInicioDate } }] },
        { $and: [{ horaInicio: { $lte: horaFinDate } }, { horaFin: { $gte: horaFinDate } }] }
      ]
    });

    if (reservaExistente) {
      return res.status(400).json({ mensaje: 'La sala ya está reservada en el horario especificado.' });
    }

    
    const nuevaReserva = new Reserva({
      fecha,
      horaInicio: horaInicioDate,
      horaFin: horaFinDate,
      edificio,
      sala,
      docenteCorreo,
      docenteNombre,
      estadoReserva: 'Reservada'
    });

    await nuevaReserva.save();

    
    await enviarCorreoConfirmacion({ nombre: docenteNombre, correo: docenteCorreo });

    res.status(201).json({ mensaje: 'Reserva creada exitosamente.' });
  } catch (error) {
    console.error('Error al crear la reserva:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
};



export const obtenerReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find();
    res.status(200).json(reservas);
  } catch (error) {
    console.error('Error al obtener las reservas:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
};


export const obtenerReservaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const reserva = await Reserva.findById(id);

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
      return res.status(404).json({ mensaje: 'Reserva no encontrada.' });
    }

    res.status(200).json({ mensaje: 'Reserva eliminada exitosamente.' });
  } catch (error) {
    console.error('Error al eliminar la reserva:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
};
