import mongoose from 'mongoose';

const edificioSchema = new mongoose.Schema({
  nombreEd: {
    type: String,
    required: true
  },
  cantidadSalas: {
    type: Number,
    required: true
  }
});

const Edificio = mongoose.model('Edificio', edificioSchema);

export default Edificio;
