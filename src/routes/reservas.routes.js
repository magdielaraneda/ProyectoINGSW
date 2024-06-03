import express from 'express';
import {
  crearReserva,
  obtenerReservas,
  obtenerReservaPorId,
  eliminarReserva
} from '../controllers/reservas.controller.js';

const router = express.Router();

router.post('/', crearReserva);
router.get('/', obtenerReservas);
router.get('/:id', obtenerReservaPorId);
router.delete('/:id', eliminarReserva);

export default router;
