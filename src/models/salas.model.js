import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const salaSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
  aforo: {
    type: Number,
    required: true,
  },
  edificio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Edificio",
    required: true,
  },
  estado: {
    type: String,
    enum: ['habilitada', 'deshabilitada'],
    default: 'habilitada',
  },
}, { timestamps: true });

const Sala = model('Sala', salaSchema);

export default Sala;
