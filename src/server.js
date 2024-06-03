import { PORT, HOST } from "./config/env.config.js";
import cors from "cors";
import express, { urlencoded, json } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import indexRoutes from "./routes/index.routes.js";
import { setupDB } from "./config/db.config.js";
import { handleFatalError, handleError } from "./utils/errorHandler.js";
import { createRoles, createUsers } from "./config/initialSetup.js";


async function setupServer() {
  try {
    const server = express();
    server.disable("x-powered-by");
    server.use(cors({ credentials: true, origin: true }));
    server.use(urlencoded({ extended: true }));
    server.use(json());
    server.use(cookieParser());
    server.use(morgan("dev"));
    server.use("/api", indexRoutes);

    server.listen(PORT, () => {
      console.log(`=> Servidor corriendo en ${HOST}:${PORT}/api`);
    });
  } catch (err) {
    handleError(err, "/server.js -> setupServer");
  }
}


async function setupAPI() {
  try {
    await setupDB();
    await setupServer();
    await createRoles();
    await createUsers();
  } catch (err) {
    handleFatalError(err, "/server.js -> setupAPI");
  }
}


setupAPI()
  .then(() => console.log("=> API Iniciada exitosamente"))
  .catch((err) => handleFatalError(err, "/server.js -> setupAPI"));