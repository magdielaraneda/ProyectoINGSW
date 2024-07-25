import { Resend } from 'resend';
import { API_KEY } from "../config/env.config.js";
import Edificio from '../models/edificio.model.js';
import Sala from '../models/salas.model.js';

export async function enviarCorreoConfirmacion(docenteCorreo, docenteNombre, nombreEdificio, nombreSala, fecha, horaInicio, horaFin) {
  const resend = new Resend(API_KEY);

  try {
    // Buscar el edificio y la sala por nombre para incluirlos en el correo
    const edificio = await Edificio.findOne({ nombreEd: nombreEdificio });
    const sala = await Sala.findOne({ nombreSa: nombreSala });

    if (!edificio) {
      throw new Error(`No se encontró un edificio con el nombre ${nombreEdificio}`);
    }

    if (!sala) {
      throw new Error(`No se encontró una sala con el nombre ${nombreSala}`);
    }

    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [docenteCorreo], // Correo del docente
      subject: 'Confirmación de reserva de sala',
      html: `Hola ${docenteNombre}, <br><br> Tu reserva de sala ha sido confirmada exitosamente. <br><br>
             Detalles de la reserva: <br>
             - Edificio: ${edificio.nombreEd} <br>
             - Sala: ${sala.nombreSa} <br>
             - Fecha: ${fecha} <br>
             - Hora de inicio: ${horaInicio} <br>
             - Hora de fin: ${horaFin} <br><br>
             Gracias por utilizar nuestro sistema de reservas.`,
    });

    if (error) {
      console.error('Error al enviar correo electrónico:', error);
      throw new Error('No se pudo enviar el correo electrónico de confirmación.');
    }

    console.log('Correo electrónico enviado exitosamente:', data);
    return data;
  } catch (error) {
    console.error('Error al enviar el correo electrónico de confirmación:', error);
    throw new Error('Error interno al enviar el correo electrónico de confirmación.');
  }
}
