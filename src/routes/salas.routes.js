import express from 'express';
import {
  crearSala,
  obtenerSalas,
  obtenerSalaPorNombre,
  eliminarSalaPorNombre,
} from '../controllers/salas.controller.js';

const router = express.Router();

router.post('/', crearSala);
router.get('/', obtenerSalas);
router.get('/:nombre', obtenerSalaPorNombre);

router.delete('/:nombre', eliminarSalaPorNombre);

export default router;
