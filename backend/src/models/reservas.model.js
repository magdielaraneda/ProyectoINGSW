import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const reservasSchema = new Schema({
  fecha: {
    type: Date,
    required: true,
  },
  horaInicio: {
    type: Date,
    required: true,
  },
  horaFin: {
    type: Date,
    required: true,
  },
  edificio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Edificio',
    required: true,
  },
  sala: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sala',
    required: true,
  },
  estadoReserva: {
    type: String,
    enum: ['Libre', 'Reservada'],
    default: 'Libre',
  },
  docenteCorreo: {
    type: String,
    required: true,
  },
  docenteNombre: {
    type: String,
    required: true,
  },
}, {
  timestamps: {
    createdAt: 'fechaReserva',
  },
});

export default model('Reserva', reservasSchema);

