import express from 'express';
import {
  crearEdificio,
  obtenerEdificios,
  obtenerEdificioPorNombre,
  eliminarEdificioPorNombre,

} from '../controllers/edificio.controller.js';

const router = express.Router();

router.post('/', crearEdificio);
router.get('/', obtenerEdificios);
router.get('/:nombreEd', obtenerEdificioPorNombre); 
router.delete('/:nombreEd', eliminarEdificioPorNombre);


export default router;
