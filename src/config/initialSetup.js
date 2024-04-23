"use strict";

import Role from "../models/role.model.js";
import User from "../models/user.model.js";

/**
 * Crea los roles por defecto en la base de datos.
 * @async
 * @function createRoles
 * @returns {Promise<void>}
 */
async function createRoles() {
  try {
    const count = await Role.estimatedDocumentCount();
    if (count > 0) return;

    await Promise.all([
      new Role({ name: "coordinador" }).save(),
      new Role({ name: "encargadoed" }).save(),
      new Role({ name: "solicitante" }).save(),
      new Role({ name: "encargadobo" }).save(),
      new Role({ name: "admin" }).save(),
    ]);
    console.log("* => Roles creados exitosamente");
  } catch (error) {
    console.error(error);
  }
}

/**
 * Crea los usuarios por defecto en la base de datos.
 * @async
 * @function createUsers
 * @returns {Promise<void>}
 */
async function createUsers() {
  try {
    const count = await User.estimatedDocumentCount();
    if (count > 0) return;

    const coordinador = await Role.findOne({ name: "coordinador" });
    const encargadoed = await Role.findOne({ name: "encargadoed" });
    const solicitante = await Role.findOne({ name: "solicitante" });
    const encargadobo = await Role.findOne({ name: "encargadobo" });
    const admin = await Role.findOne({ name: "admin" });
    await Promise.all([
      new User({
        username: "Coordinador",
        email: "coordinadorsalasubb@gmail.com",
        rut: "19335673-4",
        password: await User.encryptPassword("coordinador123"),
        roles: coordinador._id,
      }).save(),
      new User({
      username: "Encargadoed",
        email: "encargadoedubb@gmail.com",
        rut: "10340678-7",
        password: await User.encryptPassword("encargadoed123"),
        roles: encargadoed._id,
      }).save(),
      new User({
      username: "Solicitante",
        email: "solicitanteubb@gmail.com",
        rut: "11845278-1",
        password: await User.encryptPassword("solicitante123"),
        roles: solicitante._id,
      }).save(),
      new User({
      username: "Encargadobo",
        email: "encargadoboubb@gmail.com",
        rut: "19355578-5",
        password: await User.encryptPassword("encargadobo123"),
        roles: encargadobo._id,
      }).save(),
      new User({
        username: "admin",
        email: "admin@email.com",
        rut: "12345678-0",
        password: await User.encryptPassword("admin123"),
        roles: admin._id,
      }).save(),
    ]);
    console.log("* => Users creados exitosamente");
  } catch (error) {
    console.error(error);
  }
}

export { createRoles, createUsers };