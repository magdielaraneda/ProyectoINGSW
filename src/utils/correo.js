import { Resend } from 'resend';
import { API_KEY } from "../config/env.config.js";

export async function enviarCorreoConfirmacion(docente) {
  const resend = new Resend(API_KEY);

  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: [`${docente.correo}`], // Correo del docente
    subject: 'Confirmación de reserva de sala',
    html: `Hola ${docente.nombre}, <br><br> Tu reserva de sala ha sido confirmada exitosamente.`,
  });

  if (error) {
    console.error('Error al enviar correo electrónico:', error);
    throw new Error('No se pudo enviar el correo electrónico de confirmación.');
  }

  console.log('Correo electrónico enviado exitosamente:', data);
  return data;
}
