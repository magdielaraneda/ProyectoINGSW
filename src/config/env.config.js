"use strict";

import path from "node:path";
import { fileURLToPath } from "node:url";
const dirname = path.dirname(fileURLToPath(import.meta.url));

const envFilePath = path.resolve(dirname, ".env");

import dotenv from "dotenv";
dotenv.config({ path: envFilePath });

export const PORT = process.env.PORT;
export const HOST = process.env.HOST;
export const DB_URL = process.env.DB_URL;
export const ACCESS_JWT_SECRET = process.env.ACCESS_JWT_SECRET;
export const REFRESH_JWT_SECRET = process.env.REFRESH_JWT_SECRET;
export const API_KEY = process.env.API_KEY;