import mongoose from "mongoose";
import { DB_URL } from "./env.config.js";
import { handleError } from "../utils/errorHandler.js";

const options = {};

/**
 * @name setupDB
 * @description
 * @returns {Promise<void>}
 * @throws {Error}
 */
export async function setupDB() {
  try {
    await mongoose.connect(DB_URL, options);
    console.log("=> Conectado a la base de datos");
  } catch (err) {
    handleError(err, "/db.config.js -> setupDB");
  }
}


