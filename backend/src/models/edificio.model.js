import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const edificioSchema = new Schema({
  nombreEd: {
    type: String,
    required: true
  },
  cantidadSalas: {
    type: Number,
    required: true
  }
});

const Edificio = model('Edificio', edificioSchema);

export default Edificio;
