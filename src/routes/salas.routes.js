import express from 'express';
import {
  crearSala,
  obtenerSalas,
  obtenerSalaPorNombre,
  actualizarSalaPorNombre,
  eliminarSalaPorNombre,
} from '../controllers/salas.controller.js';

const router = express.Router();

router.post('/', crearSala);
router.get('/', obtenerSalas);
router.get('/:nombre', obtenerSalaPorNombre);
router.patch('/:nombre', actualizarSalaPorNombre);
router.delete('/:nombre', eliminarSalaPorNombre);

export default router;
