"use strict";
// Importa el modulo 'express' para crear las rutas
import { Router } from "express";
/** Enrutador de usuarios  */
import userRoutes from "./user.routes.js";
/** Enrutador de autenticación */
import authRoutes from "./auth.routes.js";
/** Middleware de autenticación */
import authenticationMiddleware from "../middlewares/authentication.middleware.js";
import salasRoutes from './salas.routes.js';
import edificioRoutes from './edificio.routes.js';
import reservasRoutes from './reservas.routes.js';


/** Instancia del enrutador */
const router = Router();

// Define las rutas para los usuarios /api/usuarios
router.use("/users", authenticationMiddleware, userRoutes);
// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);
router.use('/salas', salasRoutes);
router.use('/edificios', edificioRoutes);
router.use('/reservas', reservasRoutes);

// Exporta el enrutador
export default router;